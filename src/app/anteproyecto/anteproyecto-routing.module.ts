import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnteproyectoPage } from './anteproyecto.page';

const routes: Routes = [
  {
    path: '',
    component: AnteproyectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnteproyectoPageRoutingModule {}
