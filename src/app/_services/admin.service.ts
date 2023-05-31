import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApplicationUser } from '../admin/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'http://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getUsersInfoAdminView() {
    return this.http.get<Array<IApplicationUser>>(`${this.baseUrl}users`);
  }
}
