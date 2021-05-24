import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../models/APIResponse.model';
import { VragenLijst, VragenLijstPost, VragenLijstPut } from '../models/vragenLijst.model';

@Injectable({
  providedIn: 'root'
})
export class VragenlijstService {

  baseUrl = environment.url + "api/vragenlijsten"

  constructor(private http: HttpClient) { }

  create(toCreate: VragenLijstPost) {
    const obj = { ...toCreate };

    return this.http.post<APIResponse>(this.baseUrl, obj)
  }

  getAll() {
    return this.http.get<VragenLijst[]>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<VragenLijst>(this.baseUrl + '/' + id);
  }

  update(id: string, obj: VragenLijstPut) {
    const body = { ...obj }
    return this.http.put<APIResponse>(this.baseUrl + '/' + id, body)
  }

  delete(id: string) {
    return this.http.delete<APIResponse>(this.baseUrl + "/" + id);
  }
}
