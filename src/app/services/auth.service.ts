import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL ="http://localhost:3000"
  constructor(private http: HttpClient,private tokenService:TokenService) {
   }

   login(user:any){
    return this.http.post(`${this.apiURL}/auth/login`, user);
    
   }
   register(user:any){
    return this.http.post(`${this.apiURL}/users/createUser`, user);
   }

   forgetPassword(email:String){
    return this.http.post(`${this.apiURL}/auth/forget`,email);
   }

  //  resetPassword(token:String,resetPassword:any){
  //   return this.http.post(`${this.apiURL}/users/reset`, { token, resetPassword });
  //  }
  resetPassword(token: string, resetPassword: any) {
    return this.http.post(`${this.apiURL}/users/reset/${token}`, resetPassword);
}



}
