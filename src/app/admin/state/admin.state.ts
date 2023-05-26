import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, map, tap, throwError } from 'rxjs';
import { BaseState } from 'src/app/_models/base-state.model';
import { IApplicationUser, IUserInfo } from '../models/user.model';
import { GetAdminViewInfo, GetAdminViewInfoFailed, GetAdminViewInfoSuccess } from './admin.actions';
import { AdminService } from 'src/app/_services/admin.service';

export interface AdminViewStateModel extends BaseState {
  adminInfo: IApplicationUser;
  applicationUsers: IUserInfo[];
}

@State<AdminViewStateModel[]>({
  name: 'AdminView',
  defaults: [{
      adminInfo: {
        id: null,
        login: '',
        creationDate: null,
        modificationDate: null,
        userRole: [],
        userInfo: {
          id: null,
          address: '',
          city: '',
          firstName: '',
          lastName: '',
          postalCode:''
      },
    },
    applicationUsers: []
  }]
})

@Injectable()
export class AdminState {
  constructor(private adminService: AdminService) {}

  // @Selector()
  // public static userReceiptsState(state: UserReceiptsStateModel[]) {
  //   return state;
  // }

  @Action(GetAdminViewInfo)
  public getAdminViewInfo(ctx: StateContext<AdminViewStateModel[]>) {
    return this.adminService.getUsersInfoAdminView().pipe(
      map(adminInfos => {
        return adminInfos.map(dto => <AdminViewStateModel>{
          // TODO
          adminInfo: {
            creationDate: dto.creationDate,
            id: dto.id,
            login: dto.login,
            modificationDate: dto.modificationDate,
            userInfo: dto.userInfo,
            userRole: dto.userRole
          }
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
