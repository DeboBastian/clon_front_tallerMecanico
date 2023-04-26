import { User } from './../../../interfaces/user.interface';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulary: FormGroup;
  user!: User;

  constructor(
    private usersService: UsersService,
    private router: Router

  ) {
    
    this.formulary = new FormGroup({
      dni: new FormControl(null, [this.dniValidator]),
      email: new FormControl(null, [Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      password: new FormControl(null, [Validators.required])
    })
  }


  async onSubmit() {

    try {
      const response = await this.usersService.login(this.formulary.value)
      console.log(response)
      const { token } = response
      console.log(token)
      localStorage.setItem('token_key', token)
      const tokenDecode = this.usersService.decodeToken()
      console.log(tokenDecode)

        if (tokenDecode.user_role === 'mechanic') {
          this.router.navigate(['/mechanic'])
        } else {
          this.router.navigate(['/administration'])
        }
      
      if (response.fatal) {
        await Swal.fire('Error in login', 'Password, DNI or mail are not correct', 'error');
      } 
    } catch (error) {
      console.log(error)
    }
  }


checkError(control: string, validator: string) {
 return this.formulary.get(control)?.hasError(validator) && this.formulary.get(control)?.touched
}

  

  dniValidator(control: AbstractControl) {

    const dni: string = control.value;
    const listaLetras = 'TRWAGMYFPDXBNJZSQVHLCKET';

    if (!dni) return null;
    if (/^\d{8}[a-zA-Z]$/.test(dni)) {
      const numero = dni.substring(0, dni.length - 1);
      const letra = dni.substring(dni.length - 1);

      const resultado = parseInt(numero) % 23;

      if (letra.toUpperCase() !== listaLetras.at(resultado)) {
        return { dnivalidator: 'The letter of DNI is wrong' };
      }
      return null;
    }
    return { dnivalidator: 'Format of DNI is not correct' }
  }

}