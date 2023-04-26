import { ClientsService } from 'src/app/services/clients.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/interfaces/client.interface';
import { CarsService } from 'src/app/services/cars.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent {

  formulary: FormGroup;
  clients: Client[];

  constructor(

    private carsService: CarsService,
    private clientsService: ClientsService,
    private router: Router
  ) {
    this.clients = []
    this.formulary = new FormGroup({
      chasis: new FormControl(null, [Validators.required]),
      registration: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      km: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      doors: new FormControl(null, [Validators.required]),
      type: new FormControl("", [Validators.required]),
      fuel: new FormControl("", [Validators.required]),
      damages: new FormControl(null, [Validators.required]),
      clients_id: new FormControl("", [Validators.required])
    })
  }

  async ngOnInit() {
    try {
      this.clients = await this.clientsService.getAllClients()
    } catch (error) {
      console.log(error)
    }

  }


  async onSubmit() {

    try {
      const response = await this.carsService.registerCar(this.formulary.value)
      this.router.navigate(['/cars'])
      console.log(response)
      if (response.fatal) {
       
        await Swal.fire('Error in the registration of a new car', '', 'error');
      } 

    } catch (error) {
      console.log(error)
    }
  }
}
