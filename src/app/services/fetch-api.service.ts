import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchApiService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  public fetchData(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'versions-list')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
