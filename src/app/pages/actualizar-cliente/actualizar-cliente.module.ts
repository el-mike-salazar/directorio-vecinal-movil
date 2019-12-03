import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActualizarClientePage } from './actualizar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarClientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActualizarClientePage]
})
export class ActualizarClientePageModule {}
