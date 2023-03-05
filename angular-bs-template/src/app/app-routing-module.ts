import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectGuard } from './guards/redirect.guard';
import { ErrorComponent } from './public/error/error.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ RedirectGuard ],
    loadChildren: () => import('./public/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: ErrorComponent,
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
