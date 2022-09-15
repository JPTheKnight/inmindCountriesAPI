import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToeditGuard } from '../guards/toedit.guard';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { EditCountryInfoComponent } from './edit-country-info/edit-country-info.component';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: MainComponent },
      { path: ':name', component: CountryDetailsComponent },
      {
        path: ':name/edit',
        component: EditCountryInfoComponent,
        canActivate: [ToeditGuard],
      },
      { path: '**', redirectTo: '' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
