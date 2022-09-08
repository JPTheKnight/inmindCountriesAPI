import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NFormatterPipe } from '../pipes/n-formatter.pipe';
import { ArrayToStringPipe } from '../pipes/array-to-string.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/material.module';
import { EditCountryInfoComponent } from './edit-country-info/edit-country-info.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    CountryDetailsComponent,
    NFormatterPipe,
    ArrayToStringPipe,
    EditCountryInfoComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    NgImageSliderModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  bootstrap: [HomeComponent],
})
export class HomeModule {}
