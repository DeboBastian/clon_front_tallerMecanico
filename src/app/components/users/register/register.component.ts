
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formulary: FormGroup;
 

  constructor(
    
    private usersService: UsersService,
    private router: Router
  ) {

    
    this.formulary = new FormGroup({

      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),

      surname: new FormControl(null, [
        Validators.required
      ]),

      birthdate: new FormControl(null, [
        Validators.required
      ]),
 
      dni: new FormControl(null, [
        Validators.required,
        this.dniValidator
      ]),
 
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(9)

      ]),
     
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]),

      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12)
      ]),

      role: new FormControl("", [
        Validators.required
      ]),

      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/)
      ]),

      repeat_password: new FormControl()
    }, [
      this.passwordValidator
    ]);

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
        return {
          dnivalidator: 'Letter of DNI is wrong' };
      } 
      return null;
    }
    return { dnivalidator: 'DNI format must be correct' }
  }



 
  passwordValidator(form: AbstractControl) {
    
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatpassword')?.value;

    if (password === repeatPassword) {
      return null
    } else {
      form.get('repeatpassword')?.setErrors({ passwordvalidator: 'Password is not the same' })
      return { passwordvalidator: 'Password is not the same' }
    }
    return null;
  }

  
  async onSubmit() {

    try {
      const response = await this.usersService.register(this.formulary.value)
      if (response.fatal) {
        await Swal.fire('Error creating new employee', '', 'error');
      } else {
            await Swal.fire('New employeer','Welcame with us!', 'success');
      }
  
      this.router.navigate(['/aministration'])
    } catch (error) {
      await Swal.fire('Error creating new employee', '', 'error');
    }
  }


checkError(control: string, validator: string) {
  return this.formulary.get(control)?.hasError(validator) && this.formulary.get(control)?.touched
}

}

