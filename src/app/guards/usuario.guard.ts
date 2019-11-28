import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginPage } from '../pages/login/login.page';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {  // CanActivate,

  constructor( private login: LoginPage) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {

  return this.login.validaToken();
  }
}
