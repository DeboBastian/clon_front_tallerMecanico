import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

constructor(
    private router: Router,
    public usersService: UsersService
  ) { }



  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  
  async onLogOut() {

    localStorage.removeItem('token_key');
    await Swal.fire('You are now logged out', '', 'success');
    this.router.navigate(['/home'])
  }
}

