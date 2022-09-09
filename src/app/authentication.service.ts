import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration, Login, Logout, Delete } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  mainUrl = 'http://192.168.1.187:5005/swagger/index.html#//api/User';

  constructor(private http: HttpClient) {}

  loginUser(login: Login) {
    return this.http.post<Login>(this.mainUrl + '/Login()', login);
  }

  logoutUser(logout: Logout) {
    return this.http.post<Logout>(this.mainUrl + '/Logout()', logout);
  }

  createUser(reg: Registration) {
    if (reg.RoleName == 'admin') {
      return this.http.post<Registration>(
        this.mainUrl + '/CreateAdminUser()',
        reg
      );
    } else {
      return this.http.post<Registration>(this.mainUrl + '/SignUp()', reg);
    }
  }

  deleteUser(deleteUser: Delete) {
    return this.http.post<Delete>(
      this.mainUrl + '/DeleteAccount()',
      deleteUser
    );
  }
}
