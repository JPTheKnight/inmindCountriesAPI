import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    emailInput: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]),
    passwordInput: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmitForm() {}

  get getEmail() {
    return this.loginForm.get('emailInput');
  }

  get getPassword() {
    return this.loginForm.get('passwordInput');
  }
}
