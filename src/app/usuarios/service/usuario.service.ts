import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLista(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-PO-No-Count-Pending-Requests': 'true',
        'X-PO-Screen-Lock': 'true',
      }),
      params: new HttpParams(),
    };
    return this.http.get<any>(
      `${this.url}/api/framework/v1/users`,
      httpOptions
    );
  }

  getUser(CCODE: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-PO-No-Count-Pending-Requests': 'true',
        'X-PO-Screen-Lock': 'true',
      }),
      params: new HttpParams(),
    };
    return this.http.get<any>(
      `${this.url}/api/framework/v1/users/${CCODE}`,
      httpOptions
    );
  }
}
