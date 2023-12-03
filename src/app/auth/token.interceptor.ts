import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequest(request, next);
  }

  private handleRequest(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();

    if (token) {
      request = this.addTokenToRequest(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handleUnauthorizedError(request, next, error);
        }

        return throwError(error);
      })
    );
  }

  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleUnauthorizedError(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    return this.authService.handleTokenError(error).pipe(
      switchMap((tokenResponse: any) => {
        this.authService.saveTokens(
          tokenResponse.access_token,
          tokenResponse.refresh_token
        );

        const updatedRequest = this.addTokenToRequest(
          request,
          tokenResponse.access_token
        );

        return next.handle(updatedRequest);
      }),
      catchError((refreshError: any) => {
        return throwError(refreshError);
      })
    );
  }
}
