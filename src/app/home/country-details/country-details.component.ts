import { Component, OnInit, OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from 'src/app/countries.service';
import { Country } from 'src/app/models/country';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  selectAllCountries,
  selectCountry,
} from 'src/app/store/selectors/countries.selector';
import { AppState } from '../../store/country.state';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService } from 'src/app/authentication.service';
import { initializeState } from 'src/app/store/actions/countries.actions';

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

  imageObject = [
    {
      image:
        'https://images.unsplash.com/photo-1496823407868-80f47c7453b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGViYW5vbnxlbnwwfHwwfHw%3D&w=1000&q=80',
      thumbImage:
        'https://images.unsplash.com/photo-1496823407868-80f47c7453b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGViYW5vbnxlbnwwfHwwfHw%3D&w=1000&q=80',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
    },
    {
      image:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
      thumbImage:
        'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private countriesServices: CountriesService,
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
