import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from 'src/app/interfaces/reparation.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ReparationsService } from 'src/app/services/reparations.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-reparation',
  templateUrl: './card-reparation.component.html',
  styleUrls: ['./card-reparation.component.css']
})
export class CardReparationComponent {

  reparation: any
  mechanics: User[]
  log: any

  constructor(
    private reparationsService: ReparationsService,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.reparation = {
      // id: 0,
      // dstatus: "",
      // type_rep: "",
      // ate: new Date,
      // reparation: "",
      // price: "",
      // bill_number: "",
      // users_id: 0,
      // cars_id: 0

    }

    this.mechanics = []
    this.log = {}
  }

  ngOnInit() {
    try {
      this.activatedRoute.params.subscribe(async data => {
        this.reparation = await this.reparationsService.getById(parseInt(data['id']));
        console.log(this.reparation)
        this.mechanics = await this.reparationsService.mechanicForReparations(parseInt(data['id']))
      })

    } catch (error) {
      console.log(error)
    }
  }


  async onUpdate(reparationId: any) {
    try {
      this.log = await this.userService.checkAdmin();
      console.log(this.log);

      if (this.log === 'mechanic') {
        await Swal.fire('You need to be Admin', '', 'error');

      } else {
        this.router.navigate(['/reparations', 'edit', reparationId])
      }
    } catch (error) {
      console.log(error)
    }
  }


  async onDelete(reparationId: any) {
    try {
      this.log = await this.reparationsService.deleteReparation(reparationId)
      if (this.log === 'DEBES SER ADMIN') {
        await Swal.fire('You need to be Admin', '', 'error');

      } else {
        this.router.navigate(['/reparations'])
      }


    } catch (error) {
      console.log(error)
    }
  }

}
