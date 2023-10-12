import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'anteproyecto',
    loadChildren: () => import('./anteproyecto/anteproyecto.module').then( m => m.AnteproyectoPageModule)
  },
  {
    path: 'lista-anteproyectos',
    loadChildren: () => import('./lista-anteproyectos/lista-anteproyectos.module').then( m => m.ListaAnteproyectosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
