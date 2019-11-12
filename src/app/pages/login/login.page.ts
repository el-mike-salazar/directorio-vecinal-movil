import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/models/login-model/login.model';
import { Platform, IonSlides } from '@ionic/angular';
import { PersonaModel } from '../../models/login-model/login.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;

  loginModel: LoginModel = new  LoginModel();
  personaModel: PersonaModel = new PersonaModel();

  constructor( private loginService: LoginService, public platform: Platform) {
    platform.ready().then(() => {
      console.log('Width: ' + platform.width());
      console.log('Height: ' + platform.height());
    });
  }

  ngOnInit() {
    this.slides.lockSwipes( true );
  }

  login(fLogin: NgForm) {

    if (fLogin.invalid) { return; }

    console.log(this.loginModel);

    this.loginService.login(this.loginModel.strCorreo, this.loginModel.strContrasena).then( data => {
      console.log(data);
    }).catch( err => {
      console.log(err);
    });
  }

  registro(fRegistro: NgForm) {
    console.log(fRegistro.value);
  }

  recuperar(fRecuperarContrasena: NgForm) {
    console.log(fRecuperarContrasena.value);
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarRecuperarContrasena() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2);
    this.slides.lockSwipes(true);
  }

}
