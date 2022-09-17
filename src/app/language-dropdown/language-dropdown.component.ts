import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { LangdropService } from './langdrop.service';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss'],
})
export class LanguageDropdownComponent implements OnInit {
  constructor(
    private translocoService: TranslocoService,
    public langdrop: LangdropService
  ) {}

  ngOnInit(): void {}

  showLanguages($event: Event) {
    const langDialog = ($event.currentTarget as HTMLElement).parentElement
      ?.lastChild as HTMLElement;
    if (langDialog != null) langDialog.style.display = 'block';
    document.addEventListener('click', (e) => {
      if (
        (e.target as HTMLElement)?.closest('.lang-dialog') == null &&
        (e.target as HTMLElement)?.closest('.lang') == null
      ) {
        langDialog.style.display = 'none';
      }
    });
  }

  changeLanguage(lang: string, img: string, i: number) {
    this.langdrop.otherLangs.push(this.langdrop.chosenLang);
    this.langdrop.chosenLang = { lang, img };
    this.langdrop.otherLangs.splice(i, 1);
    this.translocoService.setActiveLang(lang.toLowerCase());
    const langDialog = document.getElementById('lang-dialog');
    if (langDialog != null) langDialog.style.display = 'none';
  }
}
