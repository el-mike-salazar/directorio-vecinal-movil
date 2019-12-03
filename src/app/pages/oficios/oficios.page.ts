import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ServiciosService } from 'src/app/services/servicios.service';
import { OficiosModel } from '../../models/oficiosModel';

@Component({
  selector: 'app-oficios',
  templateUrl: './oficios.page.html',
  styleUrls: ['./oficios.page.scss'],
})
export class OficiosPage implements OnInit {

  idOficio: string;
  idCategoria: string;
  cardsTienda: CardTienda[];
  oficios: OficiosModel[];
  oficio: OficiosModel;
  image: any;
  marcador = {
    strNombre: 'Punto Actual',
    fltLatitud: 0,
    fltLongitud: 0,
    nmbDistancia: 0
  };
  cargado = false;

  // tslint:disable-next-line: max-line-length
  constructor(private activeRouter: ActivatedRoute, private router: Router, private alertController: AlertController, private geolocation: Geolocation, private servicio: ServiciosService, ) { }

  async ngOnInit() {
    this.idOficio = this.activeRouter.snapshot.params.idOfi;
    this.idCategoria = this.activeRouter.snapshot.params.idCat;
    console.log(this.idOficio, this.idCategoria);

    await this.servicio.obtenerOficios(this.idCategoria).then( (oficio: any) => {
      this.oficios = oficio.cont.oficios;

      this.oficios.forEach( (ofi: OficiosModel) => {
        if (ofi._id === this.idOficio) {
          this.oficio = ofi;
          this.image = this.oficio.strImagen;
        }
      });
    }).catch( (err: any) => {
      console.log(err);
    });

    this.obtenerCards();
  }

  async obtenerCards() {
    await this.servicio.obtenerCards(this.oficio._id).then( async (cards: any) => {
      this.cardsTienda = cards.cont.cardTienda;

      console.log(cards.cont.cardTienda);

      await this.geolocation.getCurrentPosition().then( async (resp) => {

        this.marcador.fltLatitud =  resp.coords.latitude;
        this.marcador.fltLongitud = resp.coords.longitude;

        await this.cardsTienda.forEach( (cardTienda: CardTienda) => {
          this.calcularDistancia(cardTienda, this.marcador);
          this.cardsTienda.sort((a: CardTienda, b: CardTienda) => a.nmbDistancia - b.nmbDistancia);
        });

       }).catch((error) => {
         console.log('Error getting location', error);
       });
    }).catch( async(err) => {
      //this.router.navigate(['/home']);
      const alert = await this.alertController.create({
        header: 'Error ' + err.error.resp,
        subHeader: '',
        message: err.error.mensaje,
        buttons: ['OK']
      });

      await alert.present();
    });
  }

  async presentAlert(idTienda: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: idTienda,
      buttons: ['OK']
    });

    await alert.present();
  }

  refrescar(event) {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.marcador.fltLatitud =  resp.coords.latitude;
      this.marcador.fltLongitud = resp.coords.longitude;
      this.cardsTienda.forEach( (cardTienda: CardTienda) => {
        this.calcularDistancia(cardTienda, this.marcador);
        this.cardsTienda.sort((a: CardTienda, b: CardTienda) => a.nmbDistancia - b.nmbDistancia);
        event.target.complete();
      });

     }).catch((error) => {
       console.log('Error getting location', error);
     });

    this.obtenerCards();
  }

  calcularDistancia(p1: CardTienda, p2: Marcador) {
    if (!p1 || !p2) {
      p1.nmbDistancia = 0;
    }
    const R = 6371000; // radio de la tierra
    const dLat = (p2.fltLatitud - p1.fltLatitud) * Math.PI / 180;
    const dLon = (p2.fltLongitud - p1.fltLongitud) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.fltLatitud * Math.PI / 180) * Math.cos(p2.fltLatitud * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    p1.nmbDistancia = Math.round(d);
  }

}

interface CardTienda {
  idCentroC: string;
  strNombreC: string;
  fltLongitud: number;
  fltLatitud: number;
  tiendas: Tienda[];
  nmbDistancia?: number;
}

interface Tienda {
  idOficio: string;
  idTienda: string;
  strNombreT: string;
  strDesc: string;
  aJsnCarrusel: any;
  prestador: {
    idPrestador: string;
    strNombre: string;
  };
}

interface Marcador {
  strNombre: string;
  fltLatitud: number;
  fltLongitud: number;
  nmbDistancia: number;
}
