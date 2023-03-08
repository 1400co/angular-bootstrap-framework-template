import { ListaBarrioComponent } from './components/lista-barrio/lista-barrio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioBarrioComponent } from './components/formulario-barrio/formulario-barrio.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    component: ListaBarrioComponent
  },
  {
    path: 'create',
    canActivate: [ AuthGuard ],
    component: FormularioBarrioComponent
  },
  {
    path: 'edit/:id',
    canActivate: [ AuthGuard ],
    component: FormularioBarrioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarrioRoutingModule { }
