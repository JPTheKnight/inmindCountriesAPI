import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountriesService } from 'src/app/countries.service';
import { Country, Currs, Langs } from 'src/app/models/country';
import { ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/country.state';
import {
  selectAllCountries,
  selectCountry,
} from 'src/app/store/selectors/countries.selector';
import {
  initializeState,
  modifyCountryInfo,
} from 'src/app/store/actions/countries.actions';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-edit-country-info',
  templateUrl: './edit-country-info.component.html',
  styleUrls: ['./edit-country-info.component.scss'],
})
export class EditCountryInfoComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

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
    region: ['', [Validators.required]],
    population: ['', [Validators.required]],
    area: ['', [Validators.required]],
    capital: ['', [Validators.required]],
    languages: this.Languages,
    currencies: this.Currencies,
  });

  urlInput: string = '';
  wrongURL = false;

  constructor(
    private countriesServices: CountriesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(selectAllCountries).subscribe((data) => {
        if (data.length == 0) {
          this.store.dispatch(initializeState());
        }
      })
    );

    this.subscriptions.push(
      this.country$.subscribe((c) => {
        if (c != undefined) {
          this.editForm.patchValue({
            region: c.region,
            population: c.population,
            area: c.area,
            capital: c.capital,
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
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((elt) => elt.unsubscribe());
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

  save() {
    this.subscriptions.forEach((elt) => elt.unsubscribe());
    let country!: Country;
    this.country$
      .subscribe((data) => {
        country = { ...data, ...this.editForm.value };
        let object: any = { ...data.languages };
        this.languages.forEach((elt) => {
          if (elt.key.toLowerCase().startsWith('lang'))
            object[this.Languages.get(elt.key)?.value.toLowerCase()] =
              this.Languages.get(elt.key)?.value;
        });
        let object1: any = { ...data.currencies };
        this.currencies.forEach((elt) => {
          if (elt.key.toLowerCase().startsWith('curr'))
            object1[this.Currencies.get(elt.key)?.value.name.toLowerCase()] =
              this.Currencies.get(elt.key)?.value;
        });
        country = { ...country, languages: object, currencies: object1 };
      })
      .unsubscribe();
    this.store.dispatch(modifyCountryInfo({ country: country }));
  }

  addPhoto($event: Event) {
    if (!this.isImage(this.urlInput)) {
      this.wrongURL = true;
      return;
    }
    this.subscriptions.forEach((elt) => elt.unsubscribe());
    let country!: Country;
    this.country$
      .subscribe((data) => {
        country = { ...data, images: [...data.images, this.urlInput] };
      })
      .unsubscribe();
    this.store.dispatch(modifyCountryInfo({ country: country }));
    (
      ($event.currentTarget as HTMLElement).parentElement
        ?.firstChild as HTMLInputElement
    ).value = '';
    this.wrongURL = false;
  }

  isImage(url: string) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  deletePic(index: number) {
    this.subscriptions.forEach((elt) => elt.unsubscribe());
    let country!: Country;
    this.country$
      .subscribe((data) => {
        let images = [...data.images];
        images.splice(index, 1);
        country = { ...data, images: [...images] };
      })
      .unsubscribe();
    this.store.dispatch(modifyCountryInfo({ country: country }));
  }
}
