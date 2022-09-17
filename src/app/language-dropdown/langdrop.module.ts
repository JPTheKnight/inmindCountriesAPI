import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageDropdownComponent } from './language-dropdown.component';

@NgModule({
  declarations: [LanguageDropdownComponent],
  imports: [CommonModule],
  exports: [LanguageDropdownComponent],
})
export class LangdropModule {}
