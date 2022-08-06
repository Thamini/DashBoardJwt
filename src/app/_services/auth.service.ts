import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
interface LoginResponse {
  token: string;
  status: number;
}
interface DashBoardData {
  count:number
  rows:any
}

interface DashBoardResponse {
  status:number
  data:DashBoardData
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basePath = 'http://3.108.34.27:5001';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = error.error.msg;
    }
      window.alert(errorMsg);
      return throwError(() => new Error(errorMsg));
  }

  loginForm(data:any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath + '/test/auth/login', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: LoginResponse) {
    localStorage.setItem('token', resp.token);
    this.router.navigate(['/dashboard']);
  }

  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  // Get data from server for Dashboard
  getData(): Observable<DashBoardResponse> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearern '+localStorage.getItem('token'));

    return this.http
      .get<DashBoardResponse>(this.basePath + '/admin/department/list', {headers: headers})
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


}
