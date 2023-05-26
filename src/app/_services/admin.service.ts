import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApplicationUser, IUserInfo } from '../admin/models/user.model';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'http://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getUsersInfoAdminView() {
    console.warn('tap tap')
    return this.http.get<Array<IApplicationUser>>(`${this.baseUrl}users`);
  }
}
