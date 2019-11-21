import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-oficios',
  templateUrl: './oficios.page.html',
  styleUrls: ['./oficios.page.scss'],
})
export class OficiosPage implements OnInit {

  idOficio: string;
  cardsTienda: CardTienda[];

  constructor(private activeRouter: ActivatedRoute, public alertController: AlertController, private geolocation: Geolocation, private servicio: ServiciosService) { }
  marcador = {
    strNombre: 'Punto Actual',
    fltLatitud: 0,
    fltLongitud: 0,
    nmbDistancia: 0
  };

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
  }

  async ngOnInit() {

    this.idOficio = this.activeRouter.snapshot.params.id;
    this.cardsTienda = [{
      idCentroC: '5dc08cd7ecd98f64fca8d386',
      strNombreCC: 'Centro Crecer Paquita',
      fltLongitud: -102.3094807,
      fltLatitud: 21.851056,
      tiendas: [{
        idOficio: '5dd435737776091d44fdb584',
        idTienda: 'Paquita-1-5dd6b5db45bdeb2b8cef1344',
        strNombreT: 'Tienda Paquita Uno',
        strDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dignissimos sit! Quo repellat suscipit laudantium praesentium eos culpa beatae quod quasi nesciunt omnis ex libero, velit optio est odio qui?',
        ajsnCarrusel: [
          { strImagen: '6w35s4k3674ptt.jpg' }
        ],
        prestador: {
          idPrestador: '',
          strNombre: 'Luis Eduardo Castañeda Delgadillo'
        }
      },{
        idOficio: '5dd435737776091d44fdb584',
        idTienda: 'Paquita-2-5dd6b5db45bdeb2b8cef1344',
        strNombreT: 'Tienda Paquita Dos',
        strDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dignissimos sit! Quo repellat suscipit laudantium praesentium eos culpa beatae quod quasi nesciunt omnis ex libero, velit optio est odio qui?',
        ajsnCarrusel: [
          { strImagen: '6w35s4k3674ptt.jpg' }
        ],
        prestador: {
          idPrestador: '',
          strNombre: 'Luis Eduardo Castañeda Delgadillo'
        }
      },
      {
        idOficio: '5dd435737776091d44fdb584',
        idTienda: 'Paquita-3-5dd6b5db45bdeb2b8cef1344',
        strNombreT: 'Tienda Paquita Tres',
        strDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dignissimos sit! Quo repellat suscipit laudantium praesentium eos culpa beatae quod quasi nesciunt omnis ex libero, velit optio est odio qui?',
        ajsnCarrusel: [
          { strImagen: '6w35s4k3674ptt.jpg' }
        ],
        prestador: {
          idPrestador: '',
          strNombre: 'Luis Eduardo Castañeda Delgadillo'
        }
      }]
    },
    {
      idCentroC: '5dbb11e70748a94044c330db',
      strNombreCC: 'Centro Crecer Pirules',
      fltLongitud: -102.3202225,
      fltLatitud: 21.8676625,
      tiendas: [{
        idOficio: '5dd435737776091d44fdb584',
        idTienda: 'Pirul-1-5dd6b5db45bdeb2b8cef1344',
        strNombreT: 'Tienda Pirules Uno',
        strDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dignissimos sit! Quo repellat suscipit laudantium praesentium eos culpa beatae quod quasi nesciunt omnis ex libero, velit optio est odio qui?',
        ajsnCarrusel: [
          { strImagen: '6w35s4k3674ptt.jpg' }
        ],
        prestador: {
          idPrestador: '',
          strNombre: 'Luis Eduardo Castañeda Delgadillo'
        }
      }]
    },
    {
      idCentroC: '5dbb08c38a24481ffce11212',
      strNombreCC: 'Centro Crecer Miravalle',
      fltLongitud: -102.311141,
      fltLatitud: 21.891286,
      tiendas: [{
        idOficio: '5dd435737776091d44fdb584',
        idTienda: 'Mirava-1-5dd6b5db45bdeb2b8cef1344',
        strNombreT: 'Tienda Miravalle Uno',
        strDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dignissimos sit! Quo repellat suscipit laudantium praesentium eos culpa beatae quod quasi nesciunt omnis ex libero, velit optio est odio qui?',
        ajsnCarrusel: [
          { strImagen: '6w35s4k3674ptt.jpg' }
        ],
        prestador: {
          idPrestador: '',
          strNombre: 'Luis Eduardo Castañeda Delgadillo'
        }
      },
      {
        idOficio: '5dd435737776091d44fdb584',
        idTienda: 'Mirava-2-5dd6b5db45bdeb2b8cef1344',
        strNombreT: 'Tienda Miravalle Dos',
        strDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dignissimos sit! Quo repellat suscipit laudantium praesentium eos culpa beatae quod quasi nesciunt omnis ex libero, velit optio est odio qui?',
        ajsnCarrusel: [
          { strImagen: '6w35s4k3674ptt.jpg' }
        ],
        prestador: {
          idPrestador: '',
          strNombre: 'Luis Eduardo Castañeda Delgadillo'
        }
      }]
    },
    {
      idCentroC: '5dc08cd7ecd98f64fca8d386',
      strNombreCC: 'Centro Crecer Insurgentes',
      fltLongitud: -102.3543212,
      fltLatitud: 21.8424556,
      tiendas: [{
        idOficio: '5dd435737776091d44fdb584',
        idTienda: 'Insurg-1-5dd6b5db45bdeb2b8cef1344',
        strNombreT: 'Tienda Insurgentes Uno',
        strDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dignissimos sit! Quo repellat suscipit laudantium praesentium eos culpa beatae quod quasi nesciunt omnis ex libero, velit optio est odio qui?',
        ajsnCarrusel: [
          { strImagen: '6w35s4k3674ptt.jpg' }
        ],
        prestador: {
          idPrestador: '',
          strNombre: 'Luis Eduardo Castañeda Delgadillo'
        }
      }]
    }];

    this.servicio.getCategorias().toPromise().then( async (cat: any) => {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: cat.msg,
        buttons: ['OK']
      });

      await alert.present();
    }).catch( async (err: any) => {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: err.msg,
        message: err.cont,
        buttons: ['OK']
      });

      await alert.present();
    });

    await this.geolocation.getCurrentPosition().then(async (resp) => {
      this.marcador.fltLatitud =  resp.coords.latitude;
      this.marcador.fltLongitud = resp.coords.longitude;
      await this.cardsTienda.forEach( (cardTienda: CardTienda) => {
        this.calcularDistancia(cardTienda, this.marcador);
        this.cardsTienda.sort((a: CardTienda, b: CardTienda) => a.nmbDistancia - b.nmbDistancia);
      });

     }).catch((error) => {
       console.log('Error getting location', error);
     });

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
  strNombreCC: string;
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
  ajsnCarrusel: [
    {
      strImagen: string
    }
  ];
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
