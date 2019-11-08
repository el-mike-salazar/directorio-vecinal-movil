import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }

  getCategorias() {
    return this.http.get('http://localhost:3000/api/categoria/obtener');
  }
}
