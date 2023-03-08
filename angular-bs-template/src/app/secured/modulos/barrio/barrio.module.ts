import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarrioRoutingModule } from './barrio-routing.module';
import { ListaBarrioComponent } from './components/lista-barrio/lista-barrio.component';
import { FormularioBarrioComponent } from './components/formulario-barrio/formulario-barrio.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaBarrioComponent,
    FormularioBarrioComponent
  ],
  imports: [
    CommonModule,
    BarrioRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class BarrioModule { }
