import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  url = 'http://172.16.40.19:3000/api';

  constructor(private http: HttpClient) { }

  getCategorias() {
    return this.http.get(`${ this.url }/categoria/obtener`);
  }

  obtenerOficios( idCat: string ) {
    return this.http.get(`${ this.url }/oficio/obtener/${idCat}`).toPromise();
  }

  obtenerCards(idOficio: string) {
    return this.http.get(`${ this.url }/centro-crecer/obtenerCards/${ idOficio }`).toPromise();
  }
}
