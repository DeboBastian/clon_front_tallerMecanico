import { UsersService } from 'src/app/services/users.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {

  constructor(
  private router: Router,
  public usersService: UsersService
  ) { }
  

  async onLogOut() {
    
    localStorage.removeItem('token_key');
    await Swal.fire('You are now logged out', '', 'success');
    this.router.navigate(['/home']);
  }
}
