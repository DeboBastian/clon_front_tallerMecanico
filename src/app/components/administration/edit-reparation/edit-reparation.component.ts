import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { CarsService } from 'src/app/services/cars.service';
import { MechanicsService } from 'src/app/services/mechanics.service';
import { ReparationsService } from 'src/app/services/reparations.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-reparation',
  templateUrl: './edit-reparation.component.html',
  styleUrls: ['./edit-reparation.component.css']
})
export class EditReparationComponent {
  formulary: FormGroup;
  users: User[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private reparationsService: ReparationsService,
    private mechanicsService: MechanicsService,
    private router: Router
  ) {
    this.users = []
    this.formulary = new FormGroup({
      date: new FormControl(),
      status: new FormControl(),
      type_rep: new FormControl(),
      reparation: new FormControl(),
      price: new FormControl(),
      bill_number: new FormControl(),
      users_id: new FormControl(),
      cars_id: new FormControl(),
      chasis: new FormControl()
    
    })
  }


  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {

      const res = await this.reparationsService.getById(parseInt(params['id']));

      delete res.id;
      delete res.brand;
      delete res.model;
      console.log(res)
      this.formulary.setValue(res);
      this.users = await this.mechanicsService.getAllMechanics()
    });
  }


  async onSubmit() {
    this.activatedRoute.params.subscribe(async params => {
      await this.reparationsService.updateReparation(this.formulary.value, parseInt(params['id']));

      this.router.navigate(['/reparations'])
    })


  }



}
