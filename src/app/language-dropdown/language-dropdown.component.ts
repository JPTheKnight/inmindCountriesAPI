import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss'],
})
export class LanguageDropdownComponent implements OnInit {
  constructor(private translocoService: TranslocoService) {}

  chosenLang: { lang: string; img: string } = {
    lang: 'EN',
    img: '../../assets/img/Flag_of_Great_Britain_(1707–1800).svg.png',
  };

  otherLangs: { lang: string; img: string }[] = [
    { lang: 'FR', img: '../../assets/img/french_flag.webp' },
    { lang: 'AR', img: '../../assets/img/1200px-Flag_of_Lebanon.svg.webp' },
  ];

  ngOnInit(): void {
    localStorage.clear();

    const langDialog = document.getElementById('lang-dialog')! as HTMLElement;
    document.addEventListener('click', (e) => {
      if (
        (e.target as HTMLElement)?.closest('.lang-dialog') == null &&
        (e.target as HTMLElement)?.closest('.lang') == null
      ) {
        langDialog.style.display = 'none';
      }
    });
  }

  showLanguages() {
    const langDialog = document.getElementById('lang-dialog');
    if (langDialog != null) langDialog.style.display = 'block';
  }

  changeLanguage(lang: string, img: string, i: number) {
    this.otherLangs.push(this.chosenLang);
    this.chosenLang = { lang, img };
    this.otherLangs.splice(i, 1);
    this.translocoService.setActiveLang(lang.toLowerCase());
  }
}
