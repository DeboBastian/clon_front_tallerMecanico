import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/interfaces/car.interface';
import { Client } from 'src/app/interfaces/client.interface';
import { CarsService } from 'src/app/services/cars.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent {

  formulary: FormGroup;
  clients: Client[];
  car: Car | any;

  constructor(
    private carsService: CarsService,
    private activatedRoute: ActivatedRoute,
    private clientsService: ClientsService,
    private router: Router
  ){
    this.clients = []
    this.formulary = new FormGroup({
      id: new FormControl (null, [] ),
      chasis: new FormControl (null, [Validators.required]),
      registration: new FormControl (null, [Validators.required]), 
      brand: new FormControl (null, [Validators.required]),
      model: new FormControl (null, [Validators.required]),
      color: new FormControl (null, [Validators.required]),
      km: new FormControl (null, [Validators.required]),
      year: new FormControl (null, [Validators.required]),
      doors: new FormControl (null, [Validators.required]),
      type: new FormControl ("", [Validators.required]),
      fuel: new FormControl ("", [Validators.required]),
      damages: new FormControl (null, [Validators.required]),
      clients_id: new FormControl ("", [Validators.required]),
    })
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(async params => {
      console.log(params['id']);
      const response = await this.carsService.getById(params['id']);
      console.log(response);
      this.formulary.setValue(response); 
    })
  }

   async onSubmit(){
     try {
       const response = await this.carsService.update(this.formulary.value);
       console.log(response);
     } catch (error) {
       console.log(error);  
     }
   }

  checkError(control: string, validator: string) {
    return this.formulary.get('control')?.hasError('required');
  }


}
