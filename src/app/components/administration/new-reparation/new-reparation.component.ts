import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/interfaces/car.interface';
import { User } from 'src/app/interfaces/user.interface';
import { CarsService } from 'src/app/services/cars.service';
import { MechanicsService } from 'src/app/services/mechanics.service';
import { ReparationsService } from 'src/app/services/reparations.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-reparation',
  templateUrl: './new-reparation.component.html',
  styleUrls: ['./new-reparation.component.css']
})
export class NewReparationComponent {
  formulary: FormGroup;
  cars: Car[]
  users: User[]

  constructor(
    private router: Router,
    private reparationsService: ReparationsService,
    private carsService: CarsService,
    private usersService: UsersService,
    private mechanicsService: MechanicsService

  ) {
    this.cars = []
    this.users = []
    this.formulary = new FormGroup({

      type_rep: new FormControl(),
      reparation: new FormControl(),
      price: new FormControl(),
      users_id: new FormControl(),
      cars_id: new FormControl()
    })
  }


  async ngOnInit() {
    try {
      this.cars = await this.carsService.getAllCars()
      this.users = await this.mechanicsService.getAllMechanics()

    } catch (error) {
      console.log(error)
    }

  }


  async onSubmit() {

    try {
      const response = await this.reparationsService.createReparation(this.formulary.value)
      this.router.navigate(['/reparations'])
      if (response.fatal) {
        await Swal.fire('Error in the registration of a new reparation', '', 'error');
      }

    } catch (error) {
      console.log(error)
    }
  }
}
