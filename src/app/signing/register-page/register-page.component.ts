import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { Registration } from 'src/app/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerUser!: Registration;
  isAdmin!: boolean;

  regForm = this.fb.group(
    {
      FirstName: ['', [Validators.required, Validators.maxLength(32)]],
      LastName: ['', [Validators.required, Validators.maxLength(32)]],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      rePassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validator: this.ConfirmedValidator('Password', 'rePassword'),
    }
  );

  constructor(private fb: FormBuilder, private auth: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmitForm() {}

  get getFn() {
    return this.regForm.get('FirstName');
  }

  get getLn() {
    return this.regForm.get('LastName');
  }

  get getEmail() {
    return this.regForm.get('Email');
  }

  get getPassword() {
    return this.regForm.get('Password');
  }

  get getRePassword() {
    return this.regForm.get('rePassword');
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
    this.registerUser.RoleName = this.isAdmin ? 'admin' : 'user';
    this.auth.createUser(this.registerUser);
  }
}
