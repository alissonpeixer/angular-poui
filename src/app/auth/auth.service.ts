// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../usuarios/service/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/oauth2/v1/token`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location,
    private userService: UserService
  ) {}

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    return this.http
      .post(this.apiUrl, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        tap((response: any) => {
          if (response && response.access_token && response.refresh_token) {
            this.saveTokens(response.access_token, response.refresh_token);

            this.userService.getLista().subscribe((ret) => {
              this.saveUserInfo(
                ret.items.find((i: any) => i.userName === username)
              );
            });
          }
        }),
        catchError((error) => throwError(error))
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  refreshToken(refreshToken: string): Observable<any> {
    const body = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };

    return this.http.post(this.apiUrl, body);
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  saveUserInfo(userData: any) {
    localStorage.setItem('user_data', JSON.stringify(userData));
  }

  getUserInfo(): Array<any> {
    return JSON.parse(localStorage.getItem('user_data') || '');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  handleTokenError(error: any): Observable<any> {
    if (error.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        return this.refreshToken(refreshToken).pipe(
          catchError((refreshError) => throwError(refreshError))
        );
      }
    }

    return throwError(error);
  }

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();

    const isLoginPage = this.router.url.includes('/signin');

    if (isLoginPage && accessToken) {
      this.location.back();
      return true;
    }

    return !!accessToken;
  }
}
