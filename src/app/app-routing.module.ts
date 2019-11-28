import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), canLoad: [UsuarioGuard]},
  { path: 'disclaimer', loadChildren: './pages/disclaimer/disclaimer.module#DisclaimerPageModule', canLoad: [UsuarioGuard] },
  { path: 'oficios/:idCat/:idOfi', loadChildren: './pages/oficios/oficios.module#OficiosPageModule', canLoad: [UsuarioGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
