import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIAuthResponse, APIResponse } from '../models/APIResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.url + "api/auth";
  private localStorageKey = 'authToken';

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    const token = this.getToken()
    return !!token
  }

  isLoggedInObservable(){
    
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getTokenString(): string |"" {
    return localStorage.getItem('authToken') || "";
  }


  private setIsAdmin(input:boolean){
    const isAdmin:string = String(input);
    localStorage.setItem('isAdmin',isAdmin);
  }

  private getIsAdmin(): string | ""{
    return localStorage.getItem('isAdmin') || "";
  }
  
  isAdmin():boolean{
    const isAdminString = this.getIsAdmin();
    if (isAdminString == "") {
      return false;
    }
    const isAdmin = JSON.parse(isAdminString);
    //console.log("admin is " +isAdmin);
    return isAdmin;
  }

  private setGebruikersId(gebruikersId:string){
    localStorage.setItem('gebruikersId',gebruikersId);
  }
  getGebruikersId():string|""{
    return localStorage.getItem('gebruikersId') || "";
  }

  private setGebruikersNaam(gebruikersNaam:string){
    localStorage.setItem('gebruikersNaam',gebruikersNaam);
  }
  getGebruikersNaam():string|""{
    return localStorage.getItem('gebruikersNaam')||"";
  }

  

  login(email: string, wachtwoord: string): Observable<APIAuthResponse> {
    return this.loginRequest(email, wachtwoord)
      .pipe(tap((response: APIAuthResponse) => {
        this.setToken(response.token)
        this.setIsAdmin(response.isAdmin);
        this.setGebruikersId(response._id);
        this.setGebruikersNaam(response.vollenaam);
        
      }))
  }

  private loginRequest(email: string, wachtwoord: string): Observable<APIAuthResponse> {
    const body = JSON.stringify({
      "email": email,
      "wachtwoord": wachtwoord
    });
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http.post<APIAuthResponse>(this.baseUrl + "/login", body, { headers: headers });
  }



  logout() {
    this.setIsAdmin(false);
    this.setGebruikersId("");
    this.setToken("");
    this.setGebruikersNaam("");
  }

  getTokenData() {



  }

  
}
