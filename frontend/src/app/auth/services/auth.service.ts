import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const apiUrl = 'http://localhost:3001/api/user/';
const apiUrl2 = 'http://localhost:3001/api/userInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http
      .post(apiUrl + 'register', data)
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
    return this.http.post<any>(apiUrl + 'login', data, requestOptions).pipe(
      tap((_) => (this.isLoggedIn = true)),
      catchError(this.handleError('login', []))
    );
  }

  getProfile() {
    return this.http.get<any>(apiUrl2).pipe(
      tap((_) => (this.isLoggedIn = true)),
      catchError(this.handleError('login', []))
    );
  }
}
