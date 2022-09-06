import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  mainUrl = 'https://restcountries.com/v3.1/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.mainUrl + 'all');
  }

  getCountry(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(this.mainUrl + 'name/' + name);
  }
}
