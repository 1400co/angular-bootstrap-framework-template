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
    path: '**',
    component: NotFoundComponent,
    title: 'error'
  },
  // {
  //   path: 'app',
  //   canActivate: [ AuthGuard ],
  //   loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
