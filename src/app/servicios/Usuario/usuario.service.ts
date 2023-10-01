import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_SERVER = "http://localhost:8080/usuarios/";

  constructor(private httpClient:HttpClient) { }

public getAllUsuarios(): Observable<any>{
  return this.httpClient.get(this.API_SERVER);

}

public saveUsuarios(usuario:any): Observable<any>{    //resive a una persona

  return this.httpClient.post(this.API_SERVER, usuario);
  
}

public deleteUsuario(Cedula):Observable<any>{
  return this.httpClient.delete(this.API_SERVER+"delete/"+Cedula)
}

}
