import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(
    private router: Router,
    public usersService: UsersService
  ) { }


  async onLogOut() {
    
    localStorage.removeItem('token_key');
    await Swal.fire('You are now logged out', '', 'success');

  }

}
