import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private baseUrl: string;
  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/api/clients'
  }

  getAllClients() {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom<any[]>(this.httpClient.get<any>(this.baseUrl))
  }


  registerNewClient(body: any) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom(
      this.httpClient.post<any>(this.baseUrl, body)
    );
  }

  getById(id: number) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`))
  }


  getByClient(id: number) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/car/${id}`))
  }

  getClientDetails(clientId: number) {
    return this.httpClient.get(`${this.baseUrl}/${clientId}`);
  }

  deleteClient(id: number) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom<any>(
      this.httpClient.delete<any>(`${this.baseUrl}/${id}`)
    );
  }

  updateClient(body: any) {
    console.log(body)
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${body.id}`, body)
    );
  }
}











