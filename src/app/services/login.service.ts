import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = `http://localhost:3000/api`;
  token: string = null;

  constructor( private http: HttpClient, private storage: Storage) { }

  login(strCorreo: string, strPassword: string) {

    const data = {strCorreo, strPassword };

    return this.http.post(`${this.url}/persona/login`, data).toPromise();

  }
}
