import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Login } from 'src/app/models/user';
import { LoginResponse } from 'src/app/models/registerResponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginUser!: Login;
  isAdmin!: boolean;
  loginError: boolean = false;

  loginForm = new FormGroup({
    Username: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]),
    Password: new FormControl('', [Validators.required]),
  });

  subscription?: Subscription;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmitForm() {}

  get testEmail() {
    return (
      this.loginForm.get('Username') &&
      this.loginForm.get('Username')?.invalid &&
      this.loginForm.get('Username')?.touched
    );
  }

  get testPassword() {
    return (
      this.loginForm.get('Password') &&
      this.loginForm.get('Password')?.invalid &&
      this.loginForm.get('Password')?.touched
    );
  }

  login() {
    this.loginUser = this.loginForm.value;
    this.subscription = this.auth.loginUser(this.loginUser).subscribe(
      (data) => {
        let login: LoginResponse = data;
        this.auth.setToken(login.Login.AccessToken, login.Login.RefreshToken);
        console.log(this.jwtHelper.decodeToken(login.Login.AccessToken));
        console.log(
          this.jwtHelper.getTokenExpirationDate(login.Login.AccessToken)
        );
        this.router.navigate(['/countries']);
      },
      (error) => (this.loginError = true)
    );
  }
}
