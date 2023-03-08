import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ListaClasesComponent } from './components/lista-clases/lista-clases.component';
import { FormularioClasesComponent } from './components/formulario-clases/formulario-clases.component';


@NgModule({
  declarations: [
    ListaClasesComponent,
    FormularioClasesComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule
  ]
})
export class ClasesModule { }
