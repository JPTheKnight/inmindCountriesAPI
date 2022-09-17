import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DecodedAccessToken,
  LoginRes,
  LoginResponse,
} from './models/registerResponse';
import {
  Registration,
  Login,
  Logout,
  Delete,
  RefreshToken,
} from './models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private jwtService: JwtHelperService) {}

  loginUser(login: Login) {
    return this.http.post<LoginResponse>(
      environment.authUrl + '/Login()',
      login
    );
  }

  logoutUser(logout: Logout) {
    return this.http.post<Logout>(environment.authUrl + '/Logout()', logout);
  }

  createUser(reg: Registration) {
    if (reg.RoleName == 'admin') {
      return this.signUpAsAdmin(reg);
    } else {
      return this.signUpAsUser(reg);
    }
  }

  signUpAsAdmin(reg: Registration) {
    return this.http.post<Registration>(
      environment.authUrl + '/CreateAdminUser()',
      reg
    );
  }

  signUpAsUser(reg: Registration) {
    return this.http.post<Registration>(environment.authUrl + '/SignUp()', reg);
  }

  setToken(accessToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  deleteUser(deleteUser: Delete) {
    return this.http.post<Delete>(
      environment.authUrl + '/DeleteAccount()',
      deleteUser
    );
  }

  refreshToken(refreshToken: string) {
    let ref: RefreshToken = { RefreshToken: refreshToken };
    return this.http.post<LoginRes>(
      environment.authUrl + '/RefreshToken()',
      ref
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      let decoded: DecodedAccessToken = this.jwtService.decodeToken(token);
      if (decoded.realm_access.roles.includes('Admin')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
