import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApplicationUser, IBrowserUserModel } from '../admin/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'http://localhost:5001/api/users';
  constructor(private http: HttpClient) { }

  getUsersInfoAdminView() {
    return this.http.get<Array<IApplicationUser>>(`${this.baseUrl}`);
  }

  updateUser(userDto: IBrowserUserModel) {
    return this.http.put(`${this.baseUrl}`, userDto);
  }

  addUser(userDto: IBrowserUserModel) {
    return this.http.post(`${this.baseUrl}`, userDto);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
