import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration, Login, Logout, Delete } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  mainUrl = 'http://192.168.1.187:5005/api/User';

  constructor(private http: HttpClient) {}

  loginUser(login: Login) {
    return this.http.post<Login>(this.mainUrl + '/Login()', login);
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
}
