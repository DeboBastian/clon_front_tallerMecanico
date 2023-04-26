import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientsService } from 'src/app/services/clients.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})

export class EditClientComponent implements OnInit {

  client: Client;
  clientId: number;
  clientData: any;
  formulary: FormGroup;

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private location: Location

  ) {

    this.client = {
      id: 0,
      name: "",
      surname: "",
      email: "",
      phone: "",
      dni: "",
      address: "",
      card_number: 0
    }

    this.clientId = 0

    this.formulary = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      dni: new FormControl(),
      address: new FormControl(),
      card_number: new FormControl()
    })
  }



  ngOnInit() {
    try {
      this.route.params.subscribe(async data => {
        console.log(data)
        this.client = await this.clientsService.getById(parseInt(data['id']))
        this.formulary.setValue(this.client)
      })

    } catch (error) {
      console.log(error)
    }
  }


  async onSubmit() {

    try {

      const response = await this.clientsService.updateClient(this.formulary.value);
      alert('Client updated successfully!');
      this.location.back()
    } catch (error) {
      console.log('Error updating client:', error);
    }

  }

}