import { Component, OnInit } from '@angular/core';
import { LangdropService } from './langdrop.service';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss'],
})
export class LanguageDropdownComponent implements OnInit {
  constructor(public langdrop: LangdropService) {}

  ngOnInit(): void {
    if (localStorage.getItem('langChosen') === null)
      this.langdrop.changeLanguage(0);
    else
      this.langdrop.changeLanguage(
        Number.parseInt(localStorage.getItem('langChosen')!)
      );
  }

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

  changeLanguage(i: number) {
    this.langdrop.changeLanguage(i);
    const langDialog = document.getElementById('lang-dialog');
    if (langDialog != null) langDialog.style.display = 'none';
  }
}
