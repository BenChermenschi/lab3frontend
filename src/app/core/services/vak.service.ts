import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../models/APIResponse.model';
import { Vak, VakPost, VakPut } from '../models/vak.model';

@Injectable({
  providedIn: 'root'
})
export class VakService {

  baseUrl = environment.url + "api/vakken"

  constructor(private http: HttpClient) { }

  create(toCreateVak: VakPost) {
    const vak = { ...toCreateVak };
    return this.http.post<APIResponse>(this.baseUrl, vak)
  }

  getAll() {
    return this.http.get<Vak[]>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<Vak>(this.baseUrl + '/' + id);
  }

  update(id: string, toUpdate: VakPut) {
    const body = { ...toUpdate }
    return this.http.put<APIResponse>(this.baseUrl + '/' + id, body)
  }

  delete(id: string) {
    return this.http.delete<APIResponse>(this.baseUrl + "/" + id);
  }
}
