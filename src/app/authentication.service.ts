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
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  mainUrl = 'http://192.168.1.187:5005/api/User';

  constructor(private http: HttpClient, private jwtService: JwtHelperService) {}

  loginUser(login: Login) {
    return this.http.post<LoginResponse>(this.mainUrl + '/Login()', login);
  }

  logoutUser(logout: Logout) {
    return this.http.post<Logout>(this.mainUrl + '/Logout()', logout);
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
      this.mainUrl + '/CreateAdminUser()',
      reg
    );
  }

  signUpAsUser(reg: Registration) {
    return this.http.post<Registration>(this.mainUrl + '/SignUp()', reg);
  }

  setToken(accessToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  deleteUser(deleteUser: Delete) {
    return this.http.post<Delete>(
      this.mainUrl + '/DeleteAccount()',
      deleteUser
    );
  }

  refreshToken(refreshToken: string) {
    let ref: RefreshToken = { RefreshToken: refreshToken };
    return this.http.post<LoginRes>(this.mainUrl + '/RefreshToken()', ref);
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
