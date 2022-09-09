import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/countries.service';
import { Country } from 'src/app/models/country';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-country-info',
  templateUrl: './edit-country-info.component.html',
  styleUrls: ['./edit-country-info.component.scss'],
})
export class EditCountryInfoComponent implements OnInit {
  country!: Country;
  selectedRegion: string = '';

  constructor(
    private countriesServices: CountriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.countriesServices
      .getCountry(this.route.snapshot.paramMap.get('name')!)
      .subscribe((c) => {
        this.country = c[0];
      });
  }

  //FIXME
  addSection(event: Event, id: number) {
    console.log(event);
    if (id == 0) {
      this.country.languages = { ...this.country.languages, fra: 'French' };
      console.log(this.country.languages);
    }
  }

  getObjSymbol(obj: any) {
    return obj.value.symbol;
  }

  getObjName(obj: any) {
    return obj.value.name;
  }
}
