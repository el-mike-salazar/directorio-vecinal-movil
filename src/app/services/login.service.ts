import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = `http://172.16.40.5:3000/api`;

  constructor( private http: HttpClient) { }

  login(strEmail: string, strPassword: string) {

    const data = {strEmail, strPassword };

    return this.http.post(`http://172.16.40.1:3000/api/persona/login`, data).toPromise();
  }

  registro( persona ) {
    return this.http.post(`${this.url}/persona/registrar`, persona).toPromise();
  }

  validaToken( headers ) {
    return this.http.get(`http://172.16.40.1:3000/api/persona/renovarToken`, {headers}).toPromise();
  }
}
