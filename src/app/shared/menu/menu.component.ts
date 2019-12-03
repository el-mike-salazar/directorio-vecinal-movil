import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuModel } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  opciones: Observable<MenuModel[]>;

  constructor( private _menuService: MenuService, private storage: Storage, private navCtrl: NavController) { }

  ngOnInit() {
   this.opciones = this._menuService.getMenuOptions();
  }

  salir() {
    console.log('entro');
    this.storage.clear();
    this.navCtrl.navigateRoot( '/login', { animated: true } );
  }

}
