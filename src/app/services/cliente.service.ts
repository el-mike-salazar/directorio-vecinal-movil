import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  selectCliente: ClienteModel;
  searchText: string;
  url = `http://172.16.40.19:3000/api`;

  constructor( private http: HttpClient) { }

  getCliente(_id: string) {
    return this.http.get(`${this.url}/persona/obtener/${_id}`).toPromise();
  }

  putCliente( _id: string, cliente: ClienteModel ) {
    return this.http.put(`${this.url}/persona/actualizar/${_id}`, cliente ).toPromise();
  }
}

