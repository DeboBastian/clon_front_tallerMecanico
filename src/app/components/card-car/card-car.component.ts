import { Car } from './../../interfaces/car.interface';
import { Component } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client.interface';


@Component({
  selector: 'app-card-car',
  templateUrl: './card-car.component.html',
  styleUrls: ['./card-car.component.css']
})
export class CardCarComponent {

  car: Car
  clients: Client[]

  constructor(
    private carsService: CarsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.car = {
      id: 0,
      chasis: "",
      registration: "",
      brand: 0,
      model: "",
      color: "",
      km: 0,
      year: 0,
      doors: 0,
      type: "",
      fuel: "",
      damages: "",
      clients_id: 0
    }

    this.clients = []
    this.car
  }

  ngOnInit() {
    try {
        this.activatedRoute.params.subscribe(async data => {
        this.car = await this.carsService.getById(parseInt(data['id']));
        this.clients = await this.carsService.getByClient(parseInt(data['id']))
      })
    } catch (error) {
      console.log(error)
    }
  }

  // async ngOnInit(){
  //   try {
  //     const response = await this.carsService.getAllCars();
  //     this.car = response.results; 
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }

  async onClickDelete(indice: number | undefined) {    
    if (indice) {
      await this.carsService.deleteById(indice)
      try {
        this.car = await this.carsService.getAllCars()
        this.router.navigate(['/cars'])
      } catch (error) {
        console.log(error)
      }
    }  
    } 
    
  updateCar(url: string) {
      alert('Car was modified')
      this.router.navigate(['cars/update']);
    }
  

  
  }
