import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteModel } from '../../models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { AlertController } from '@ionic/angular';

const idCliente = '5ddc47fcda1ad315040f620d';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.page.html',
  styleUrls: ['./actualizar-cliente.page.scss'],
})
export class ActualizarClientePage implements OnInit {

  cliente: ClienteModel = new ClienteModel();
  @Output() salida = new EventEmitter();

  constructor( private _clienteService: ClienteService, private alertCtlr: AlertController ) { }

  ngOnInit() {
  this._clienteService.getCliente(idCliente).then( (c: any) => {
    this.cliente = c.cont.persona[0];
    console.log(this.cliente);
  });

  }

  onSubmitTemplate() {}

  regresar() {
  }


  actualizarCliente() {


    this._clienteService.putCliente( idCliente, this.cliente).then( async (data) => {
      const alert = await this.alertCtlr.create({
        header: '¡Hecho!',
        message: 'Tu información se actualizo exitosamente',
        buttons: ['OK']
      });
      await alert.present();
    }).catch( async (err) => {

      const errores = err.error.cont.err.errors;

      if (errores.strNombre) {
        const alert = await this.alertCtlr.create({
          header: 'Error',
          message: errores.strNombre.message,
          buttons: ['OK']
        });
        await alert.present();
      }
      if (errores.strPrimerApellido) {
        const alert = await this.alertCtlr.create({
          header: 'Error',
          message: errores.strPrimerApellido.message,
          buttons: ['OK']
        });
        await alert.present();
      }
      if (errores.strSegundoNombre) {
        const alert = await this.alertCtlr.create({
          header: 'Error',
          message: errores.strSegundoNombre.message,
          buttons: ['OK']
        });
        await alert.present();
      }
      if (errores.strColonia) {
        const alert = await this.alertCtlr.create({
          header: 'Error',
          message: errores.strColonia.message,
          buttons: ['OK']
        });
        await alert.present();
      }
      if (errores.strTelefono) {
        const alert = await this.alertCtlr.create({
          header: 'Error',
          message: errores.strTelefono.message,
          buttons: ['OK']
        });
        await alert.present();
      }
      if (errores.numCodigoPostal) {
        const alert = await this.alertCtlr.create({
          header: 'Error',
          message: errores.numCodigoPostal.message,
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

}
