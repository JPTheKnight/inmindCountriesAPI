import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Logout } from '../models/user';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private ngxPerm: NgxPermissionsService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    localStorage.clear();
  }

  onCloseMenu() {
    const sideMenu = document.getElementById('side-menu-bg');
    if (sideMenu != null) sideMenu.style.display = 'none';
  }

  onOpenMenu() {
    const sideMenu = document.getElementById('side-menu-bg');
    if (sideMenu != null) sideMenu.style.display = 'block';
  }

  logout() {
    let logout: Logout = {
      Token: localStorage.getItem('access_token')!,
      RefreshToken: localStorage.getItem('refresh_token')!,
    };
    this.auth.logoutUser(logout).subscribe(
      () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.ngxPerm.removePermission('ADMIN');
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log('Error');
      }
    );
  }
}
