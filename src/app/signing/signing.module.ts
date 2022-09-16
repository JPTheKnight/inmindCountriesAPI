import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigningRoutingModule } from './signing-routing.module';
import { SigningComponent } from './signing.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { TranslocoModule } from '@ngneat/transloco';
import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown.component';

@NgModule({
  declarations: [
    SigningComponent,
    LoginPageComponent,
    RegisterPageComponent,
    LanguageDropdownComponent,
  ],
  imports: [
    CommonModule,
    SigningRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslocoModule,
  ],
  bootstrap: [SigningComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SigningModule {}
