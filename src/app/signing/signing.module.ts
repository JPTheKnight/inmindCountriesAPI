import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigningRoutingModule } from './signing-routing.module';
import { SigningComponent } from './signing.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [SigningComponent, LoginPageComponent, RegisterPageComponent],
  imports: [CommonModule, SigningRoutingModule],
  bootstrap: [SigningComponent],
})
export class SigningModule {}
