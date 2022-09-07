import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from 'src/app/countries.service';
import { Country } from 'src/app/country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.Resize();
  }

  country: Country[] = [];
  isInfoContainerUp: boolean = false;
  imageSize: any = { height: 400, width: 600 };
  isEditing: boolean = false;

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
    private router: Router
  ) {
    this.onResize();
  }

  ngOnInit(): void {
    const countryDialog = document.getElementById(
      'country-dialog'
    )! as HTMLElement;
    document.addEventListener('click', (e) => {
      if (
        (e.target as HTMLElement)?.closest('.country-dialog') == null &&
        (e.target as HTMLElement)?.closest('.countries-av') == null
      ) {
        countryDialog.style.display = 'none';
      }
    });

    this.countriesServices
      .getCountry(
        this.route.snapshot.paramMap.get('name')!,
        this.route.snapshot.paramMap.get('name')!.length == 3 ? 'alpha' : 'name'
      )
      .subscribe((c) => (this.country = c));

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const infoDialog = document.getElementById('info-container');
    if (infoDialog != null) {
      this.Resize();
    }
  }

  showCountries() {
    const countryDialog = document.getElementById('country-dialog');
    if (countryDialog != null) countryDialog.style.display = 'flex';
  }

  showInfo() {
    const infoDialog = document.getElementById('info-container');
    const upArrow = document.getElementById('info-up-arrow');
    if (infoDialog != null && upArrow != null && !this.isInfoContainerUp) {
      //infoDialog.style.bottom = '0';
      upArrow.style.transform = 'rotate(180deg) translateX(50%)';
      this.isInfoContainerUp = true;
      return;
    } else if (
      infoDialog != null &&
      upArrow != null &&
      this.isInfoContainerUp
    ) {
      //infoDialog.style.bottom = `${this.bottom}px`;
      upArrow.style.transform = 'rotate(0) translateX(-50%)';
      this.isInfoContainerUp = false;
      return;
    }
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

  edit() {
    this.isEditing = true;
  }

  save() {
    this.isEditing = false;
  }

  toJson(data: any) {
    return JSON.stringify(data);
  }
}
