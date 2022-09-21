import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CountriesAPI';

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('remember') == '0' &&
      sessionStorage.getItem('remember') == null
    ) {
      this.auth.deleteToken();
    }
  }
}
