import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { switchMap } from 'rxjs/operators';
import { Logout } from './models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService,
    private jwt: JwtHelperService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      if (!this.jwt.isTokenExpired(accessToken)) {
        const cloned = request.clone({
          headers: request.headers.set(
            'Authorization',
            'Bearer ' + accessToken
          ),
        });
        console.log('Token Accepted');
        return next.handle(cloned);
      } else {
        const aToken = localStorage.getItem('access_token');
        localStorage.removeItem('access_token');
        console.log('Refreshing token');
        return this.auth
          .refreshToken(localStorage.getItem('refresh_token')!)
          .pipe(
            switchMap((data) => {
              this.auth.setToken(data.AccessToken, data.RefreshToken);
              const cloned = request.clone({
                headers: request.headers.set(
                  'Authorization',
                  'Bearer ' + data.AccessToken
                ),
              });
              return next.handle(cloned);
            }),
            catchError((error) => {
              let logout: Logout = {
                Token: aToken!,
                RefreshToken: localStorage.getItem('refresh_token')!,
              };
              this.auth.logoutUser(logout);
              return throwError(error);
            })
          );
      }
    } else {
      return next.handle(request);
    }
  }
}
