import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from 'src/app/interfaces/reparation.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ReparationsService } from 'src/app/services/reparations.service';

@Component({
  selector: 'app-card-reparation',
  templateUrl: './card-reparation.component.html',
  styleUrls: ['./card-reparation.component.css']
})
export class CardReparationComponent {

  reparation: any
  mechanics: User[]

  constructor(
    private reparationsService: ReparationsService,
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



  async onDelete(reparationId: any) {
    try {
      await this.reparationsService.deleteReparation(reparationId)
      this.router.navigate(['/reparations'])
    } catch (error) {
      console.log(error)
    }
  }

}
