import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { IRregistrationModel } from '../register/registration.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  public login(model: any) {
    return this.http.post(`${this.baseUrl}account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('roles', JSON.stringify(user.role));
          localStorage.setItem('user', JSON.stringify(user.userName));
          localStorage.setItem('token', JSON.stringify(user.token));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: IRregistrationModel) {
    return this.http.post<User>(`${this.baseUrl}account/register`, model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('roles', JSON.stringify(user.role));
          localStorage.setItem('user', JSON.stringify(user.userName));
          localStorage.setItem('token', JSON.stringify(user.token));
          this.currentUserSource.next(user);
        }
      }),
    )
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  getCurrentUserName(): string {
    const user: string = JSON.parse(localStorage.getItem('user'));
    return user ?? '';
  }

  getCurrentUserRoles(): Array<string> {
    const roles: Array<string> = JSON.parse(localStorage.getItem('roles'));
    return roles;
  }

  getCurrentUser(): User {
    return {
      userName: JSON.parse(localStorage.getItem('user')),
      token: JSON.parse(localStorage.getItem('token')),
      role: JSON.parse(localStorage.getItem('roles'))
    } as User;
  }
}
