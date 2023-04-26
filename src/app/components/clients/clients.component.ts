import { Component } from '@angular/core';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientsService } from 'src/app/services/clients.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  clients: Client[];

  constructor(
    private clientsService: ClientsService
  ) {
    this.clients = [];
  }

  async ngOnInit() {
    const clients = await this.clientsService.getAllClients();
    this.clients = clients;
  };


}











