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
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  login(email: string, wachtwoord: string): Observable<APIAuthResponse> {
    return this.loginRequest(email, wachtwoord)
      .pipe(tap((response: APIAuthResponse) => {
        this.setToken(response.token)
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

  }

  getTokenData() {

  }
}
