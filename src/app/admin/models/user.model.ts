import { Moment } from "moment";
import { Role } from "src/app/shared/roles/enums/role.enum";

export interface IApplicationUser {
  id: number;
  userName: string;
  creationDate: Moment;
  modificationDate: Moment;
  password: string;
  userRole: IUserRole[];
  userInfo: IUserInfo;
}

export interface ICurrentUserForm {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface IUserInfo {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface IUserRole {
  id: number;
  role: Role;
}

export interface IBrowserUserModel {
  id?: number;
  login: string;
  creationDate?: string;
  modificationDate?: string;
  roles: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  password: string;
}
