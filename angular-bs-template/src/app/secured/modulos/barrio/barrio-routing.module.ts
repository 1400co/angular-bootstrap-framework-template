import { ListaBarrioComponent } from './components/lista-barrio/lista-barrio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioBarrioComponent } from './components/formulario-barrio/formulario-barrio.component';

const routes: Routes = [
  {
    path: '',
    component: ListaBarrioComponent
  },
  {
    path: 'create',
    component: FormularioBarrioComponent
  },
  {
    path: 'edit/:id',
    component: FormularioBarrioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarrioRoutingModule { }
