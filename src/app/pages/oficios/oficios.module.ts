import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule } from '@ionic/angular';

import { OficiosPage } from './oficios.page';
import { MetricaPipe } from '../../pipes/metrica.pipe';

const routes: Routes = [
  {
    path: '',
    component: OficiosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Geolocation
  ],
  declarations: [OficiosPage, MetricaPipe ]
})
export class OficiosPageModule {}
