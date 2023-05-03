import { ReparationsService } from 'src/app/services/reparations.service';
import { Reparation } from './../../interfaces/reparation.interface';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reparations',
  templateUrl: './reparations.component.html',
  styleUrls: ['./reparations.component.css']
})
export class ReparationsComponent {

  reparations: Reparation[]
  admin: string


  constructor(
    private reparationsService: ReparationsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.reparations = []
    this.admin = ''
  }



  async ngOnInit() {
    try {
      const reparations = await this.reparationsService.getAllReparations();
      this.reparations = reparations;
    } catch (error) {
      console.log(error)
    }

  }

  async goBack() {

    this.admin = await this.usersService.checkAdmin();

    if (this.admin === 'admin') {
      this.router.navigate(['/administration'])
    } else {
      this.router.navigate(['/mechanic'])
    }
  }

}