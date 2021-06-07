import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../models/APIResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.url + "api/auth";

  constructor(private http:HttpClient) { }

  login() {
    const credentials={
      "email":"admin@thomasmore.be",
      "wachtwoord":"admin"
      }
    return this.http.post<APIResponse>(this.baseUrl,credentials);

  }

  logout() {

  }

  getTokenData() {

  }
}
