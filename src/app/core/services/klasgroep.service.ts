import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Klasgroep } from '../models/klasgroep.model';

@Injectable({
  providedIn: 'root'
})
export class KlasgroepService {

  baseUrl = environment.url + "api/klasgroepen"

  constructor(private http: HttpClient) { }
  create() {

  }

  getAll() {
    return this.http.get<Klasgroep[]>(this.baseUrl);
  }

  getById() {

  }

  update() {

  }

  delete() {

  }
}
