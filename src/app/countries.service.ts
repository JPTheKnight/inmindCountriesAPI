import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { Country } from './models/country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.mainUrl + 'all');
  }

  /*getCountry(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(this.mainUrl + 'name/' + name);
  }

  getCountriesToASpecificRegion(region: string) {
    return this.http.get<Country[]>(this.mainUrl + 'region/' + region);
  }*/

  // searchCountries(term: string): Observable<Country[]> {
  //   if (!term.trim()) {
  //     return of([]);
  //   }
  //   return this.http.get<Country[]>(
  //     this.mainUrl + 'name/' + term + '?fulltext=true'
  //   );
  // }
}
