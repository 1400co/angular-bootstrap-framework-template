import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarrioRoutingModule } from './barrio-routing.module';
import { ListaBarrioComponent } from './components/lista-barrio/lista-barrio.component';
import { FormularioBarrioComponent } from './components/formulario-barrio/formulario-barrio.component';


@NgModule({
  declarations: [
    ListaBarrioComponent,
    FormularioBarrioComponent
  ],
  imports: [
    CommonModule,
    BarrioRoutingModule
  ]
})
export class BarrioModule { }
