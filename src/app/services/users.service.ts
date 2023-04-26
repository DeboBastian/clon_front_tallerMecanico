import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import JwtDecode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;
  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/api/users'
  }


  // getAllUsers() {
  //   return firstValueFrom(this.httpClient.get<any>(this.baseUrl))
  // }


  register(body: any) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, body)
      
    )
  }


  login(body: any) {
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, body)
    )
  }


  decodeToken() {
    return JwtDecode<any>(localStorage.getItem('token_key')!)
  }


  isLogged(): boolean {
    if (localStorage.getItem('token_key')) {
      return true;
    } else {
      return false;
    }
  }



  updateAdminEmployeer(values: any, id: number) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/edit/${id}`, values)
    );
  }

  
  deleteAdmin(id: number) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/admin/${id}`))
  }

  
  getAllAdmin() {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/admins`))
  }


  getAdminById(id: number) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Authorization': localStorage.getItem('token_key')!
    //   })
    // }
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/admins/${id}`))
  }



}