import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private baseUrl: string;
  
  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/api/cars'
  }

  registerCar(body: any) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom(
      this.httpClient.post<any>(this.baseUrl, body)
    )
  }

  updateCar(body: any) {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/${body.id}`, body)
    )
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
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/client/${id}`))
  }
 

  deleteById(id: number) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    let url = `${this.baseUrl}/${id}`;
    return firstValueFrom(this.httpClient.delete<any>(url))
  }


  getAllCars() {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom(this.httpClient.get<any>(this.baseUrl))
  }

  update(values: any){
    console.log(values);
    
    return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/${values.id}`, values))
  }
}
