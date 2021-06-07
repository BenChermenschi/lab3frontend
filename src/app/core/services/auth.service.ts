import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.url + "api/auth";

  constructor() { }

  login() {
    
  }

  logout() {

  }

  getTokenData() {

  }
}
