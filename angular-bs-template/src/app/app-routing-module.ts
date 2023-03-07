import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectGuard } from './guards/redirect.guard';
import { NotFoundComponent } from './public/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ RedirectGuard ],
    loadChildren: () => import('./public/auth/auth.module').then((m) => m.AuthModule),
  },
  {
     path: 'secured',
     //canActivate: [ AuthGuard ],
     loadChildren: () => import('./secured/secured.module').then((m) => m.SecuredModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'error'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
