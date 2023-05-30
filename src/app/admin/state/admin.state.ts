import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, map, tap, throwError } from 'rxjs';
import { BaseState } from 'src/app/_models/base-state.model';
import { IApplicationUser, IBrowserUserModel, IUserInfo } from '../models/user.model';
import { GetAdminViewInfo, GetAdminViewInfoFailed, GetAdminViewInfoSuccess } from './admin.actions';
import { AdminService } from 'src/app/_services/admin.service';
import * as moment from 'moment';

export interface AdminViewStateModel extends BaseState, IApplicationUser {}

@State<AdminViewStateModel[]>({
  name: 'AdminView',
  defaults: [{
    id: null,
    creationDate: null,
    userName: '',
    modificationDate: null,
    userInfo: {
      id: null,
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
    },
    userRole: [],
    errors: []
  }]
})

@Injectable()
export class AdminState {
  constructor(private adminService: AdminService) {}

  @Selector()
  public static users(state: AdminViewStateModel[]): IBrowserUserModel[] {
   return state.map(m => <IBrowserUserModel> ({
      address: m.userInfo.address,
      city: m.userInfo.city,
      creationDate: (moment(m.creationDate)).format('DD-MMM-YYYY HH:mm:ss'),
      firstName: m.userInfo.firstName,
      lastName: m.userInfo.lastName,
      login: m.userName,
      modificationDate: (moment(m.modificationDate)).format('DD-MMM-YYYY HH:mm:ss'),
      id: m.id,
      postalCode: m.userInfo.postalCode,
      roles: m.userRole.map(role => role.role).toString()
    }));
  }

  @Action(GetAdminViewInfo)
  public getAdminViewInfo(ctx: StateContext<AdminViewStateModel>) {
    return this.adminService.getUsersInfoAdminView().pipe(
      map(adminInfos => {
        return adminInfos.map(dto => <AdminViewStateModel>{
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
        })
      }),
      tap(adminInfo => ctx.dispatch(new GetAdminViewInfoSuccess(adminInfo))),
      catchError(error => {
        ctx.dispatch(new GetAdminViewInfoFailed());
        return throwError(() => error)
      }),
    );
  }

  @Action(GetAdminViewInfoSuccess)
  getUsersSuccess(ctx: StateContext<AdminViewStateModel[]>, { adminView }: GetAdminViewInfoSuccess) {
    ctx.setState(adminView);
  }
}
