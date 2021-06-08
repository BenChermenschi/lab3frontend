import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../models/APIResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.url + "api/auth";

  constructor(private http:HttpClient) { }

  login(email:string,wachtwoord:string) {
    const body=JSON.stringify({
      "email":email,
      "wachtwoord":wachtwoord
      });
      const headers = new HttpHeaders({"Content-Type":"application/json"});

    return this.http.post<APIResponse>(this.baseUrl+"/login",body,{headers:headers});

  }

  logout() {

  }

  getTokenData() {

  }
}
