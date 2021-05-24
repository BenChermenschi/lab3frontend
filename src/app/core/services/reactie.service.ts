import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reactie, ReactiePost , ReactiePut} from '../models/reactie.model';
import { APIResponse } from '../models/APIResponse.model';


@Injectable({
  providedIn: 'root'
})
export class ReactieService {

  baseUrl = environment.url + "api/reacties"

  constructor(private http: HttpClient) { }

  create(toCreate: ReactiePost) {
    const obj = { ...toCreate };

    return this.http.post<APIResponse>(this.baseUrl, obj)
  }

  getAll() {
    return this.http.get<Reactie[]>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<Reactie>(this.baseUrl + '/' + id);
  }

  update(id: string, obj: ReactiePut) {
    const body = { ...obj }
    return this.http.put<APIResponse>(this.baseUrl + '/' + id, body)
  }

  delete(id: string) {
    return this.http.delete<APIResponse>(this.baseUrl + "/" + id);
  }

}
