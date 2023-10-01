import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
private API_SERVER = "http://localhost:8080/rol/";
  
constructor(private httpClient:HttpClient) { }

public getAllRoles(): Observable<any>{
  return this.httpClient.get(this.API_SERVER);
}



}
