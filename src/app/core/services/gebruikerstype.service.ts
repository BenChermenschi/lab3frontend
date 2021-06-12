import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gebruikerstype } from '../models/gebruikerstype.model';

@Injectable({
  providedIn: 'root'
})

export class GebruikerstypeService {

  baseUrl=environment.url + "api/gebruikerstypes"


  constructor(private http:HttpClient) { }
  create() {

  }

  getAll() {
    return this.http.get<Gebruikerstype[]>(this.baseUrl);
  }

  getById(id:string) {
    return this.http.get<Gebruikerstype>(this.baseUrl+'/'+id);
  }

  update() {

  }

  delete() {

  }
}
