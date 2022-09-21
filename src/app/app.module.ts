import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SigningModule } from './signing/signing.module';
import { HomeModule } from './home/home.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';
import { countryReducer } from './store/reducers/country.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffects } from './store/effects/countries.effects';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    SigningModule,
    HomeModule,
    StoreModule.forRoot({ countries: countryReducer }),
    EffectsModule.forRoot([CountryEffects]),
    NgxPermissionsModule.forRoot(),
    HttpClientModule,
    TranslocoRootModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [],
})
export class AppModule {}
