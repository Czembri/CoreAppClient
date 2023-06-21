import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, map, tap, throwError } from 'rxjs';
import { BaseState } from 'src/app/_models/base-state.model';
import { IApplicationUser, IBrowserUserModel } from '../models/user.model';
import { GetAdminViewInfo, GetAdminViewInfoFailed, GetAdminViewInfoSuccess } from './admin.actions';
import { AdminService } from 'src/app/_services/admin.service';
import * as moment from 'moment';

export interface AdminViewStateModel extends BaseState {
  users: IApplicationUser[],
  adminForm?: {
    model: IBrowserUserModel;
  }
}

@State<AdminViewStateModel>({
  name: 'AdminView',
  defaults: {
    users: [{
      id: null,
      creationDate: null,
      userName: '',
      modificationDate: null,
      password: null,
      userInfo: {
        id: null,
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
      },
      userRole: [],
    }],
    adminForm: {
      model: undefined,
    },
    errors: []
  }
})

@Injectable()
export class AdminState {
  constructor(private adminService: AdminService) {}

  @Selector()
  public static users(state: AdminViewStateModel): IBrowserUserModel[] {
   return state.users.map((appUser: IApplicationUser) => {
      return {
        address: appUser.userInfo.address,
        city: appUser.userInfo.city,
        creationDate: (moment(appUser.creationDate)).format('DD-MMM-YYYY HH:mm:ss'),
        firstName: appUser.userInfo.firstName,
        lastName: appUser.userInfo.lastName,
        login: appUser.userName,
        modificationDate: (moment(appUser.modificationDate)).format('DD-MMM-YYYY HH:mm:ss'),
        id: appUser.id,
        postalCode: appUser.userInfo.postalCode,
        roles: appUser.userRole.map(role => role.role).toString(),
        password: appUser?.password
      }
   });
  }

  @Action(GetAdminViewInfo)
  public getAdminViewInfo(ctx: StateContext<AdminViewStateModel>) {
    return this.adminService.getUsersInfoAdminView().pipe(
      map(adminInfos => {
        const users = new Array<IApplicationUser>;
        adminInfos.forEach(dto => {
          users.push({
            creationDate: dto.creationDate,
            id: dto.id,
            userName: dto.userName,
            modificationDate: dto.modificationDate,
            userInfo: {
              address: dto.userInfo.address,
              city: dto.userInfo.city,
              firstName: dto.userInfo.firstName,
              id: dto.userInfo.id,
              lastName: dto.userInfo.lastName,
              postalCode: dto.userInfo.postalCode
            },
            userRole: dto.userRole.map(role => ({
              id: role.id,
              role: role.role
            }))
          } as IApplicationUser);
        })
        return users;
      }),
      tap(adminInfo => ctx.dispatch(new GetAdminViewInfoSuccess(adminInfo))),
      catchError(error => {
        ctx.dispatch(new GetAdminViewInfoFailed());
        return throwError(() => error)
      }),
    );
  }

  @Action(GetAdminViewInfoSuccess)
  getUsersSuccess(ctx: StateContext<AdminViewStateModel>, { adminView }: GetAdminViewInfoSuccess) {
   ctx.setState({
    users: adminView
   });
  }
}
