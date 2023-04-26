import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-card-employee',
  templateUrl: './card-employee.component.html',
  styleUrls: ['./card-employee.component.css']
})
export class CardEmployeeComponent {
  admin: User

  constructor(
  private usersService: UsersService,
  private activatedRoute: ActivatedRoute,
  private router: Router 
  ) {
    this.admin = {
      id: 0,
      name: "",
      surname: "",
      birthdate: 0,
      dni: "",
      phone: "",
      email: "",
      username: "",
      password: "",
      role: "",
      incorporation_date: new Date,
    }
  }
  

  ngOnInit() {
    try {
      this.activatedRoute.params.subscribe(async data => {
        this.admin = await this.usersService.getAdminById(parseInt(data['id']))
        
      })

    } catch (error) {
      console.log(error)
    }
  }



  async onClick(adminId: any) {
    try {
      await this.usersService.deleteAdmin(adminId)
      this.router.navigate(['/admins'])
    } catch (error) {
      console.log(error)
    }
  }

}
