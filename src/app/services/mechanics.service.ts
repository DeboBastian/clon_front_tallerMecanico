import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MechanicsService {

  private baseUrl: string;
  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/api/mechanics'
  }



  getAllMechanics() {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom<any[]>(this.httpClient.get<any>(this.baseUrl))
  }


  getById(id: number) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`))
  }


}
