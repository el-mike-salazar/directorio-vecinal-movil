import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  arrCategoria: any;

  slideOpts = {
    slidesPerView: 0,
    freeMode: true,
    spaceBetween: 5
  };
  constructor(public platform: Platform, private servicio: ServiciosService) {
    platform.ready().then((readySource) => {
      /*<<--------Resoluciones TypeScript------->>*/

      /*XS*/
      if (platform.width() >= 0 &&  platform.width() <= 575) {
        this.slideOpts.slidesPerView = 2.6;
      }

      /*SM*/
      if (platform.width() >= 576 &&  platform.width() <= 767) {
        this.slideOpts.slidesPerView = 3.6;
      }

      /*MD*/
      if (platform.width() >= 768 &&  platform.width() <= 991) {
        this.slideOpts.slidesPerView = 4.6;
      }

      /*LG*/
      if (platform.width() >= 992 &&  platform.width() <= 1199) {
        this.slideOpts.slidesPerView = 5.8;
      }

      /*XL*/
      if (platform.width() >= 1200 &&  platform.width() <= 2560) {
        this.slideOpts.slidesPerView = 6.8;
      }
    });

  }

  ngOnInit() {
    this.servicio.getCategorias().subscribe(resp => {
      this.arrCategoria = resp['cont'].categorias;
      console.log(this.arrCategoria);
    });
  }

  funcionp() {
    console.log('holi');
  }
}
