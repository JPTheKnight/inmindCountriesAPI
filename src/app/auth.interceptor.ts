import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { switchMap, tap } from 'rxjs/operators';
import { Logout } from './models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private route: Router,
    private auth: AuthenticationService,
    private inject: Injector,
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
        return next.handle(cloned);
      } else {
        const aToken = localStorage.getItem('access_token');
        localStorage.removeItem('access_token');
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
      } /*.pipe(
        catchError((err) => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
              return this.handleRefreshToken(request, next);
            }
            if (err.status === 404) {
              this.route.navigate(['/error']);
            }
          }

          // return the error back to the caller
          return throwError(err);
        })
      );*/
    } else {
      return next.handle(request);
    }
  }
}
