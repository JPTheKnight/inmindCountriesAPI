import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { Login } from 'src/app/models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginUser!: Login;
  isAdmin!: boolean;

  loginForm = new FormGroup({
    Username: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]),
    Password: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {}

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
    this.auth.loginUser(this.loginUser).subscribe((data) => console.log(data));
  }
}
