import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent {

  formulary: FormGroup;

  constructor(
    private clientsService: ClientsService,
    private router: Router
  ) {
    this.formulary = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      dni: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      card_number: new FormControl(null, [Validators.required])
    })
  }

  async onSubmit() {

    try {
      const response = await this.clientsService.registerNewClient(this.formulary.value)
       this.router.navigate(['/clients'])
      if (response.fatal) {
        await Swal.fire('Error in the registration of a new client', '', 'error');
      } 
     
    } catch (error) {
      console.log(error)
    }
  }

}