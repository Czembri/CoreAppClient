import { Moment } from "moment";
import { Role } from "src/app/shared/roles/enums/role.enum";

export interface IApplicationUser {
  id: number;
  login: string;
  creationDate: Moment;
  modificationDate: Moment;
  userRole: IUserRole[];
  userInfo: IUserInfo;
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
