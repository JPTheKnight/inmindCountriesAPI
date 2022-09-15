import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntoAuthGuard } from './guards/into_auth.guard';
import { OutOfAuthGuard } from './guards/out-of-auth.guard';

const routes: Routes = [
  {
    path: 'countries',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [IntoAuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./signing/signing.module').then((m) => m.SigningModule),
    canActivate: [OutOfAuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
