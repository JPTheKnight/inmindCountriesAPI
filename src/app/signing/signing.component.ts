import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss'],
})
export class SigningComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.auth.deleteToken();
  }
}
