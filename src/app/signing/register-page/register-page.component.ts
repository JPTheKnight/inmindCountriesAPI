import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  regForm = this.fb.group(
    {
      fnInput: ['', [Validators.required, Validators.maxLength(32)]],
      lnInput: ['', [Validators.required, Validators.maxLength(32)]],
      emailInput: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      passwordInput: ['', [Validators.required, Validators.minLength(8)]],
      rePasswordInput: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validator: this.ConfirmedValidator('passwordInput', 'rePasswordInput'),
    }
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmitForm() {}

  get getFn() {
    return this.regForm.get('fnInput');
  }

  get getLn() {
    return this.regForm.get('lnInput');
  }

  get getEmail() {
    return this.regForm.get('emailInput');
  }

  get getPassword() {
    return this.regForm.get('passwordInput');
  }

  get getRePassword() {
    return this.regForm.get('rePasswordInput');
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
}
