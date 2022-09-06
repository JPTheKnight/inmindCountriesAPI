import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from 'src/app/countries.service';
import { Country } from 'src/app/country';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    if (window.innerWidth < 1023) {
      this.imageSize = { height: 400, width: 600 };
    }
    if (window.innerWidth < 640) {
      this.imageSize = { height: 300, width: 500 };
    }
    if (window.innerWidth < 500) {
      this.imageSize = { height: 300, width: 400 };
    }
    if (window.innerWidth < 380) {
      this.imageSize = { height: 200, width: 300 };
    }
  }

  country: Country[] = [];
  infoContainer: boolean = false;
  imageSize: any = { height: 400, width: 600 };
  imageStyle: any = 'width: 80%;';
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
    private countriesServices: CountriesService
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
      .getCountry(this.route.snapshot.paramMap.get('name')!)
      .subscribe((c) => (this.country = c));

    setTimeout(() => {
      console.log(this.country);
    }, 3000);
  }

  showCountries() {
    const countryDialog = document.getElementById('country-dialog');
    if (countryDialog != null) countryDialog.style.display = 'flex';
  }

  showInfo() {
    const infoDialog = document.getElementById('info-container');
    const upArrow = document.getElementById('info-up-arrow');
    if (infoDialog != null && upArrow != null && !this.infoContainer) {
      infoDialog.style.bottom = '0';
      upArrow.style.transform = 'rotate(180deg) translateX(50%)';
      this.infoContainer = true;
      return;
    } else if (infoDialog != null && upArrow != null && this.infoContainer) {
      infoDialog.style.bottom = '-65vh';
      upArrow.style.transform = 'rotate(0) translateX(-50%)';
      this.infoContainer = false;
      return;
    }
  }
}
