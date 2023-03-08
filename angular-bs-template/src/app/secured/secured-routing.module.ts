import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        canActivate: [ AuthGuard ],
        component: DashboardComponent,
        title:"Dashboard"
      },
      {
        path: 'barrios',
        canActivate: [ AuthGuard ],
        loadChildren: () => import('./modulos/barrio/barrio.module').then((m) => m.BarrioModule),
     },
     {
      path: '**',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuredRoutingModule { }
