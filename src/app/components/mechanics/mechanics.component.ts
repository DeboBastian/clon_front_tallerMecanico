import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { MechanicsService } from 'src/app/services/mechanics.service';



@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.css']
})
export class MechanicsComponent {

  mechanics: User[];

  constructor(
    private mechanicsService: MechanicsService
  ) {
    this.mechanics = []
  }

  async ngOnInit() {
    const mechanics = await this.mechanicsService.getAllMechanics()
    this.mechanics = mechanics;
  };

}
