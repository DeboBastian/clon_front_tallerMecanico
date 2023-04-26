import { ReparationsService } from 'src/app/services/reparations.service';
import { Reparation } from './../../interfaces/reparation.interface';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reparations',
  templateUrl: './reparations.component.html',
  styleUrls: ['./reparations.component.css']
})
export class ReparationsComponent {

  reparations: Reparation[]
 

  constructor(
    private reparationsService: ReparationsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.reparations = []
  }



  async ngOnInit() {
    try {
      const reparations = await this.reparationsService.getAllReparations();
      this.reparations = reparations;
    } catch (error) {
      console.log(error)
    }
    
  }
}