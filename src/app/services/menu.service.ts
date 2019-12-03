import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuModel } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( private http: HttpClient) { }

  getMenuOptions() {
    return this.http.get<MenuModel[]>('/assets/data/menu.json');
  }
}
