import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Registration } from 'src/app/models/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerUser!: Registration;

  regForm = this.fb.group(
    {
      Firstname: ['', [Validators.required, Validators.maxLength(32)]],
      Lastname: ['', [Validators.required, Validators.maxLength(32)]],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      rePassword: ['', [Validators.required, Validators.minLength(8)]],
      isAdmin: [false],
    },
    {
      validator: this.ConfirmedValidator('Password', 'rePassword'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitForm() {}

  get testFn() {
    return (
      this.regForm.get('Firstname') &&
      this.regForm.get('Firstname')?.invalid &&
      this.regForm.get('Firstname')?.touched
    );
  }

  get testLn() {
    return (
      this.regForm.get('Lastname') &&
      this.regForm.get('Lastname')?.invalid &&
      this.regForm.get('Lastname')?.touched
    );
  }

  get testEmail() {
    return (
      this.regForm.get('Email') &&
      this.regForm.get('Email')?.invalid &&
      this.regForm.get('Email')?.touched
    );
  }

  get testPassword() {
    return (
      this.regForm.get('Password') &&
      this.regForm.get('Password')?.invalid &&
      this.regForm.get('Password')?.touched
    );
  }

  get testRePassword_Input() {
    return (
      this.regForm.get('rePassword') &&
      this.regForm.get('rePassword')?.errors?.required &&
      this.regForm.get('rePassword')?.touched
    );
  }

  get testRePassword_Chars() {
    return (
      this.regForm.get('rePassword') &&
      !this.regForm.get('rePassword')?.errors?.required &&
      this.regForm.get('rePassword')?.touched &&
      !this.regForm.get('rePassword')?.errors?.confirmedValidator &&
      this.regForm.get('rePassword')?.invalid
    );
  }

  get testRePassword_Match() {
    return (
      this.regForm.get('rePassword') &&
      this.regForm.get('rePassword')?.touched &&
      this.regForm.get('rePassword')?.errors?.confirmedValidator
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  register() {
    this.registerUser = this.regForm.value;
    this.registerUser.RoleName = this.regForm.get('isAdmin')?.value
      ? 'admin'
      : 'user';
    this.auth.createUser(this.registerUser).subscribe(
      () => this.router.navigate(['/login']),
      (error) => console.log(error)
    );
  }
}
