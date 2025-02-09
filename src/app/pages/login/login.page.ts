import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/models/login-model/login.model';
import { Platform, IonSlides, NavController } from '@ionic/angular';
import { PersonaModel } from '../../models/login-model/login.model';
import { LoginService } from '../../services/login.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Storage } from '@ionic/storage';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;

  loginModel: LoginModel = new  LoginModel();
  personaModel: PersonaModel = new PersonaModel();
  token: string = null;

  // tslint:disable-next-line: max-line-length
  constructor( private loginService: LoginService, public platform: Platform, private navCtrl: NavController, private uiService: UiServiceService, private storage: Storage) {
    platform.ready().then(() => {
      console.log('Width: ' + platform.width());
      console.log('Height: ' + platform.height());
    });
  }

  ngOnInit() {
    console.log('entre');
    this.slides.lockSwipes( true );
  }

  async login(fLogin: NgForm) {

    if (fLogin.invalid) { return; }

    await this.loginService.login( this.loginModel.strEmail, this.loginModel.strPassword ).then( (data: any) => {
      this.guardarToken(data.cont.token);
      this.navCtrl.navigateRoot( '/home', { animated: true } );
    }).catch( err => {
      this.token = null;
      this.storage.clear();
      this.uiService.alertaInformativa(err.error.msg);
    });
  }

  async registro() {
    if (this.personaModel.strPassword !== this.personaModel.strPasswordConf) {
      this.uiService.alertaInformativa('Las contraseñas no coinciden');
    } else {
      const regCliente = new FormData();
      regCliente.append('strNombre', this.personaModel.strNombre);
      regCliente.append('strPrimerApellido', this.personaModel.strPrimerApellido);
      regCliente.append('strSegundoApellido', this.personaModel.strSegundoApellido);
      regCliente.append('strCalle', this.personaModel.strCalle);
      regCliente.append('strColonia', this.personaModel.strColonia);
      regCliente.append('numCodigoPostal', this.personaModel.numCodigoPostal);
      regCliente.append('strTelefono', this.personaModel.strTelefono);
      regCliente.append('strCorreo', this.personaModel.strCorreo);
      regCliente.append('strPassword', this.personaModel.strPassword);
      regCliente.append('arrRol', this.personaModel.strTelefono);
      regCliente.append('strTelefono', this.personaModel.strTelefono);
      regCliente.append('nombreImg', this.personaModel.nombreImg);

      await this.loginService.registro(regCliente).then( data => {
        console.log(data);
        // this.guardarToken(data.cont.token);
        this.navCtrl.navigateRoot( '/home', { animated: true } );
      }).catch( err => {
        // this.token = null;
        // this.storage.clear();
        this.uiService.alertaInformativa(err.error.const.err);
      });
    }
  }

  async guardarToken( token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot( '/login', { animated: true } );
      return Promise.reject(false);
    }

    const headers = new HttpHeaders({
      Authorization: this.token
    });

    await this.loginService.validaToken(headers).then( (resp: any) => {
      this.personaModel = resp.cont.usuario;
      this.guardarToken(resp.cont.token);
    }).catch(err => {
      this.navCtrl.navigateRoot( '/login', { animated: true } );
      console.log(err);
    });

    return Promise.resolve(true);
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
