import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnteproyectoPageRoutingModule } from './anteproyecto-routing.module';

import { AnteproyectoPage } from './anteproyecto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnteproyectoPageRoutingModule
  ],
  declarations: [AnteproyectoPage]
})
export class AnteproyectoPageModule {}
