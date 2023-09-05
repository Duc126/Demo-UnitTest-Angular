import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersInterface } from '../interface/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAllUserData() {
    return this.http.get<UsersInterface[]>(this.baseUrl + 'users');
  }

  getUser(id: number): Observable<UsersInterface> {
    return this.http.get<UsersInterface>(this.baseUrl + 'users/' + id);
  }

  updateUser(user: UsersInterface): Observable<UsersInterface> {
    return this.http.put<UsersInterface>(this.baseUrl + 'users/' + user.id, user);
  }

  deleteUser(id: number): Observable<UsersInterface> {
    return this.http.delete<UsersInterface>(this.baseUrl + 'users/' + id);
  }
}
