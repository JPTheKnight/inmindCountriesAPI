import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { Country } from 'src/app/models/country';
import { initializeState } from 'src/app/store/actions/countries.actions';
import {
  selectAllCountries,
  selectCountry,
} from 'src/app/store/selectors/countries.selector';
import { AppState } from '../../store/country.state';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.Resize();
  }

  isInfoContainerUp: boolean = false;
  imageSize: any = { height: 400, width: 600 };
  isEditing: boolean = false;
  paramName: string = this.route.snapshot.paramMap.get('name')!;
  country$: Observable<Country> = this.store.select(
    selectCountry(this.paramName)
  );

  subscriptions: Subscription[] = [];

  imageObject: { image: string; thumbImage: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private ngxPerm: NgxPermissionsService,
    private auth: AuthenticationService
  ) {
    this.onResize();
  }

  ngOnInit(): void {
    const countryDialog = document.getElementById(
      'country-dialog'
    )! as HTMLElement;
    document.addEventListener('click', (e) => {
      if (
        countryDialog != null &&
        (e.target as HTMLElement)?.closest('.country-dialog') == null &&
        (e.target as HTMLElement)?.closest('.countries-av') == null
      ) {
        countryDialog.style.display = 'none';
      }
    });

    if (this.auth.isAdmin()) {
      this.ngxPerm.loadPermissions(['ADMIN']);
    }

    this.subscriptions.push(
      this.store.select(selectAllCountries).subscribe((data) => {
        if (data.length == 0) {
          this.store.dispatch(initializeState());
        }
      })
    );

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.country$.subscribe((data) => {
      if (data != undefined) {
        data.images.forEach((elt) =>
          this.imageObject.push({ image: elt, thumbImage: elt })
        );
      }
    });

    const infoDialog = document.getElementById('info-container');
    if (infoDialog != null) {
      this.Resize();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((elt) => elt.unsubscribe());
  }

  getOriginalNameOfCountry(c: string) {
    return this.store
      .select(selectAllCountries)
      .pipe(map((data) => data.filter((obj) => obj.cca3 == c)[0].name.common));
  }

  showCountries() {
    const countryDialog = document.getElementById('country-dialog');
    if (countryDialog != null) countryDialog.style.display = 'flex';
  }

  Resize() {
    if (window.innerWidth > 1023 && window.innerHeight < 600) {
      this.imageSize = { height: 300, width: 500 };
    }
    if (window.innerWidth < 1023) {
      this.imageSize = { height: 400, width: 600 };
    }
    if (window.innerWidth < 640) {
      this.imageSize = { height: 300, width: 500 };
    }
    if (window.innerWidth < 500) {
      this.imageSize = { height: 250, width: 350 };
    }
    if (window.innerWidth < 380) {
      this.imageSize = { height: 200, width: 300 };
    }
  }

  imageClick() {
    const images = document.getElementById('images');
    if (images != null) {
      images.style.zIndex = '999999';
    }
  }

  lightboxClose() {
    const images = document.getElementById('images');
    if (images != null) {
      images.style.zIndex = '999';
    }
  }

  toJson(data: any) {
    return JSON.stringify(data);
  }
}
