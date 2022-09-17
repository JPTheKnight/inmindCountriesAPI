import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LangdropService {
  chosenLang: { lang: string; img: string } = {
    lang: 'EN',
    img: '../../assets/img/Flag_of_Great_Britain_(1707–1800).svg.png',
  };

  otherLangs: { lang: string; img: string }[] = [
    { lang: 'FR', img: '../../assets/img/french_flag.webp' },
    { lang: 'ES', img: '../../assets/img/Bandera_de_España.svg.webp' },
  ];

  constructor() {}
}
