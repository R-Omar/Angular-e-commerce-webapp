import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private  userUrl = environment.apiUrl + '/api/user/';
  private  userInfoUrl = environment.apiUrl + '/api/userInfo';

  isLoggedIn = false;
  redirectUrl: string;
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http
      .post(this.userUrl + 'register', data)
      .pipe(catchError(this.handleError('login', [])));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.isLoggedIn = false;
      return of(result as T);
    };
  }

  login(data: any) {
    const requestOptions: Object = {
      responseType: 'text',
    };
    return this.http.post<any>(this.userUrl + 'login', data, requestOptions).pipe(
      tap((_) => (this.isLoggedIn = true)),
      catchError(this.handleError('login', []))
    );
  }

  getProfile() {
    return this.http.get<any>(this.userInfoUrl).pipe(
      tap((_) => (this.isLoggedIn = true)),
      catchError(this.handleError('login', []))
    );
  }
}