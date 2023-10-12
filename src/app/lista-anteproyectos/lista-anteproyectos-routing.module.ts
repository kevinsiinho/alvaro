import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAnteproyectosPage } from './lista-anteproyectos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAnteproyectosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAnteproyectosPageRoutingModule {}
