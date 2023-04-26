import { UsersService } from 'src/app/services/users.service';
import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  users: User[]


  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.users = []
  }


  async ngOnInit() {
    try {
      const users = await this.usersService.getAllAdmin()
      this.users = users;
    } catch (error) {
      console.log(error)
    }

  }
}