import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent {
  formulary: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { 
    this.formulary = new FormGroup({

      name: new FormControl(null, [
        Validators.required
      ]),

      surname: new FormControl(null, [
        Validators.required
      ]),

      birthdate: new FormControl(null, [
        Validators.required
      ]),


      dni: new FormControl(null, [
        Validators.required
      ]),

      phone: new FormControl(null, [
        Validators.required
      ]),

      email: new FormControl(null, [
        Validators.required
      ]),

      username: new FormControl(null, [
        Validators.required
      ]),

      password: new FormControl(null, [
        Validators.required
      ]),
    })
  }



  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {

      const res = await this.usersService.getAdminById(parseInt(params['id']));
      
      delete res.id;
      delete res.role;
      delete res.incorporation_date;
    
      this.formulary.setValue(res);
     
    });
  }


  async onSubmit() {
    this.activatedRoute.params.subscribe(async params => {
      
      const response = await this.usersService.updateAdminEmployeer(this.formulary.value, parseInt(params['id']));
      this.router.navigate(['/admins'])
      if (response.fatal) {
        await Swal.fire('Update failed ', '', 'error');
      } 
      
    })


  }

}
