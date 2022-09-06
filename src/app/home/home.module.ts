import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClientModule } from '@angular/common/http';
import { NFormatterPipe } from '../pipes/n-formatter.pipe';
import { ArrayToStringPipe } from '../pipes/array-to-string.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    CountryDetailsComponent,
    NFormatterPipe,
    ArrayToStringPipe,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    NgImageSliderModule,
    HttpClientModule,
  ],
  bootstrap: [HomeComponent],
})
export class HomeModule {}
