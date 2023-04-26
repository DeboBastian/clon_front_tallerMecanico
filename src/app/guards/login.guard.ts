import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(
    private router: Router
  ) { }

  canActivate() {
    if (!localStorage.getItem('token_key')) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  checkAdmin() {
   
    const obj = jwtDecode<any>(localStorage.getItem('token_key')!);
    console.log(obj);
   
    if (obj.role !== 'admin') {
      alert('Only ADMIN');
      return false;
    }
    return true;
  }

}
