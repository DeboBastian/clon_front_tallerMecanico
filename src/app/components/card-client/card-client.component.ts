import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/interfaces/car.interface';
import { Client } from 'src/app/interfaces/client.interface';
import { CarsService } from 'src/app/services/cars.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-client',
  templateUrl: './card-client.component.html',
  styleUrls: ['./card-client.component.css']
})
export class CardClientComponent {

  client: Client
  cars: Car[]

  constructor(
    private clientsService: ClientsService,
    private activatedRoute: ActivatedRoute,
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


    this.cars = []
  }

  ngOnInit() {
    try {
      this.activatedRoute.params.subscribe(async data => {
        console.log(data)
        this.client = await this.clientsService.getById(parseInt(data['id']));
        this.cars = await this.clientsService.getByClient(parseInt(data['id']))
      })

    } catch (error) {
      console.log(error)
    }
  }

  async deleteClient(client: Client) {
    const confirmed = confirm(`¿Seguro que desea eliminar al cliente ${client.name}?`);
    if (confirmed && client.id != undefined) {
      await this.clientsService.deleteClient(client.id);
      this.location.back();
    }
  }


}
