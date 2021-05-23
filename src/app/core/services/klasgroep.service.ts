import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../models/APIResponse.model';
import { Klasgroep, KlasgroepPost, KlasgroepPut } from '../models/klasgroep.model';

@Injectable({
  providedIn: 'root'
})
export class KlasgroepService {

  baseUrl = environment.url + "api/klasgroepen"


  constructor(private http: HttpClient) { }

  create(toAddKlasgroep: KlasgroepPost) {
    const klasgroep = { ...toAddKlasgroep }
    return this.http.post<APIResponse>(this.baseUrl, klasgroep)
  }

  getAll() {
    return this.http.get<Klasgroep[]>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<Klasgroep>(this.baseUrl + '/' + id);
  }

  update(id: string, toUpdateKlasgroep: KlasgroepPut) {
    const klasgroep = { ...toUpdateKlasgroep }
    return this.http.put<APIResponse>(this.baseUrl + '/' + id, klasgroep)
  }

  delete(id: string) {
    return this.http.delete<APIResponse>(this.baseUrl + "/" + id);
  }
}
