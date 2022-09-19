import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss'],
})
export class SigningComponent implements OnInit {
  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
