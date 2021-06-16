import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../models/APIResponse.model';
import { Gebruiker, GebruikerPatchPass, GebruikerPost, GebruikerPut } from '../models/gebruiker.model';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  baseUrl=environment.url + "api/gebruikers";

  constructor(private http:HttpClient) { }

  create(toAddGebruiker:GebruikerPost){
    const gebruiker = {...toAddGebruiker}
    return this.http.post<APIResponse>(this.baseUrl,gebruiker);
  }

  getAll(){
    return this.http.get<Gebruiker[]>(this.baseUrl);
  }

  getById(id:string){
    return this.http.get<Gebruiker>(this.baseUrl+'/'+id);
  }

  update(id:string,toUpdateGebruiker:GebruikerPut){
    const gebruiker = {...toUpdateGebruiker}
    return this.http.put<APIResponse>(this.baseUrl+'/'+id,gebruiker);
  }

  patchPass(id:string,toUpdateGebruiker:GebruikerPatchPass){
    const gebruiker = {...toUpdateGebruiker};
    return this.http.patch<APIResponse>(this.baseUrl+'/'+id,gebruiker);
  }

  delete(id:string){
    return this.http.delete<APIResponse>(this.baseUrl+"/"+id);
  }



}
