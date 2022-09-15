import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Langs } from 'src/app/models/country';

@Component({
  selector: 'app-languages-form',
  templateUrl: './languages-form.component.html',
  styleUrls: ['./languages-form.component.scss'],
})
export class LanguagesFormComponent implements OnInit {
  @Input() langItem!: Langs;
  @Input() index: number = 0;

  @Input() form!: FormGroup;

  @Output() newInput = new EventEmitter<number>();

  addNewInput() {
    this.newInput.emit(this.index);
  }

  constructor(private rootFormGroup: FormGroupDirective) {
    // this.form = this.rootFormGroup.control;
    // console.log(this.rootFormGroup);
  }

  ngOnInit(): void {}
}
