import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LangdropService {
  otherLangs: { lang: string; img: string }[] = [
    {
      lang: 'EN',
      img: '../../assets/img/Flag_of_Great_Britain_(1707–1800).svg.png',
    },
    { lang: 'FR', img: '../../assets/img/french_flag.webp' },
    { lang: 'ES', img: '../../assets/img/Bandera_de_España.svg.webp' },
  ];

  constructor(private translocoService: TranslocoService) {}

  changeLanguage(i: number) {
    localStorage.setItem('langChosen', i.toString());
    this.translocoService.setActiveLang(this.otherLangs[i].lang.toLowerCase());
  }

  getChosenLang(): { lang: string; img: string } {
    return this.otherLangs[
      Number.parseInt(JSON.parse(localStorage.getItem('langChosen')!))
    ];
  }

  getRestLanguages() {
    return this.otherLangs.filter(
      (elt, index) => index !== JSON.parse(localStorage.getItem('langChosen')!)
    );
  }
}
