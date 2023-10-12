import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAnteproyectosPageRoutingModule } from './lista-anteproyectos-routing.module';

import { ListaAnteproyectosPage } from './lista-anteproyectos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAnteproyectosPageRoutingModule
  ],
  declarations: [ListaAnteproyectosPage]
})
export class ListaAnteproyectosPageModule {}
