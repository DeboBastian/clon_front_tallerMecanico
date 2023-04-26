
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { MechanicsService } from 'src/app/services/mechanics.service';
import { ReparationsService } from 'src/app/services/reparations.service';

@Component({
  selector: 'app-card-mechanic',
  templateUrl: './card-mechanic.component.html',
  styleUrls: ['./card-mechanic.component.css']
})
export class CardMechanicComponent {
  mechanic: User
  reparations: any;

  constructor(
    private mechanicService: MechanicsService,
    private reparationsService: ReparationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.mechanic = {
      id: 0,
      name: "",
      surname: "",
      birthdate: 0,
      dni: "",
      phone:"",
      email:"",
      username:"",
      password:"",
      role:"",
      incorporation_date: new Date
    }

    this.reparations = []
    }
  


  ngOnInit() {
    try {
      this.activatedRoute.params.subscribe(async data => {
        this.mechanic = await this.mechanicService.getById(parseInt(data['id']));
    
        this.reparations = await this.reparationsService.getByUsers(parseInt(data['id']))
        console.log(this.reparations)

      })

    } catch (error) {
      console.log(error)
    }
  }
}
