import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersInterface } from '../interface/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 500) {
      console.error('Internal Server Error:', error);
    } else if (error.status === 404) {
      console.error('Resource not found:', error);
    } else if (error.status === 403) {
      console.error('Forbidden:', error);
    }
    return throwError(error);
  }

  getAllUserData(): Observable<UsersInterface[]> {
    return this.http.get<UsersInterface[]>(this.baseUrl + 'users')
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  getUser(id: number): Observable<UsersInterface> {
    return this.http.get<UsersInterface>(this.baseUrl + 'users/' + id)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  updateUser(user: UsersInterface): Observable<UsersInterface> {
    return this.http.put<UsersInterface>(this.baseUrl + 'users/' + user.id, user)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  deleteUser(id: number): Observable<UsersInterface> {
    return this.http.delete<UsersInterface>(this.baseUrl + 'users/' + id)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }
}
