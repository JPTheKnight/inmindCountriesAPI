import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/countries.service';
import { Country, Currs, Langs } from 'src/app/models/country';
import { ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/country.state';
import { selectCountry } from 'src/app/store/selectors/countries.selector';

@Component({
  selector: 'app-edit-country-info',
  templateUrl: './edit-country-info.component.html',
  styleUrls: ['./edit-country-info.component.scss'],
})
export class EditCountryInfoComponent implements OnInit {
  selectedRegion: string = '';
  param: string = this.route.snapshot.paramMap.get('name')!;
  country$: Observable<Country> = this.store.select(selectCountry(this.param));

  languages: Langs[] = [];
  Languages: FormGroup = this.fb.group({}, Validators.required);
  lang_id: number = 0;

  currencies: Currs[] = [];
  Currencies: FormGroup = this.fb.group({}, Validators.required);
  Currencies_Data: FormGroup[] = [];
  curr_id: number = 0;

  editForm = this.fb.group({
    Region: ['', [Validators.required]],
    Population: ['', [Validators.required]],
    Area: ['', [Validators.required]],
    Capital: ['', [Validators.required]],
    Languages: this.Languages,
    Currencies: this.Currencies,
  });

  constructor(
    private countriesServices: CountriesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.country$.subscribe((c) => {
      this.editForm.patchValue({
        Region: c.region,
        Population: c.population,
        Area: c.area,
        Capital: c.capital,
      });
      for (let i = 0; i < Object.keys(c.languages).length; i++) {
        this.languages.push({
          key: Object.keys(c.languages)[i],
          value: Object.values(c.languages)[i],
        });
      }
      this.languages.forEach((formItem) => {
        const formControl = this.fb.control(formItem.value, [
          Validators.required,
        ]);
        this.Languages?.addControl(formItem.key, formControl);
      });
      for (let i = 0; i < Object.keys(c.currencies).length; i++) {
        this.currencies.push({
          key: Object.keys(c.currencies)[i],
          symbol: Object.values(c.currencies)[i].symbol,
          name: Object.values(c.currencies)[i].name,
        });
      }
      this.currencies.forEach((formItem) => {
        this.Currencies_Data.push(
          this.fb.group(
            {
              symbol: [formItem.symbol, [Validators.required]],
              name: [formItem.name, [Validators.required]],
            },
            [Validators.required]
          )
        );
        this.Currencies?.addControl(
          formItem.key,
          this.Currencies_Data[this.Currencies_Data.length - 1]
        );
      });
    });
  }

  createNewLanguageInput(isFirst: boolean, itemKey: string) {
    if (isFirst) {
      this.languages.push({
        key: 'lang' + this.lang_id,
        value: '',
      });
      const formControl = this.fb.control('', [Validators.required]);
      this.Languages.addControl('lang' + this.lang_id, formControl);
      this.lang_id++;
    } else {
      this.languages.splice(
        this.languages.indexOf(
          this.languages.filter((elt) => elt.key == itemKey)[0]
        ),
        1
      );
      this.Languages.removeControl(itemKey);
    }
  }

  createNewCurrencyInput(isFirst: boolean, itemKey: string) {
    if (isFirst) {
      this.currencies.push({
        key: 'curr' + this.curr_id,
        symbol: '',
        name: '',
      });
      this.Currencies_Data.push(
        this.fb.group(
          {
            symbol: ['', [Validators.required]],
            name: ['', [Validators.required]],
          },
          [Validators.required]
        )
      );
      this.Currencies.addControl(
        'curr' + this.curr_id,
        this.Currencies_Data[this.Currencies_Data.length - 1]
      );
      this.curr_id++;
    } else {
      const index: number = this.currencies.indexOf(
        this.currencies.filter((elt) => elt.key == itemKey)[0]
      );
      this.currencies.splice(index, 1);
      this.Currencies.removeControl(itemKey);
      this.Currencies_Data.splice(index, 1);
    }
  }
}
