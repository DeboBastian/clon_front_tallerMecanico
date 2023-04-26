import { Car } from 'src/app/interfaces/car.interface';
import { CarsService } from './../../services/cars.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {

  cars: Car[]
  
  
  constructor(
    private carsService: CarsService
  ) {
    this.cars = []
    }
  

  async ngOnInit() {
    try {
      this.cars = await this.carsService.getAllCars()
      console.log(this.cars);
    } catch (error) {
      console.log(error)
    }
   
  }

  

}
