import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, Store, ofActionCompleted } from '@ngxs/store';
import { AdminState } from './state/admin.state';
import { GetAdminViewInfo } from './state/admin.actions';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { IBrowserUserModel } from './models/user.model';
import { ISubNavigationOptions } from '../sub-navigation/sub-nav.model';
import { AddAdminCommand } from './commands/add-admin.command';
import { CommandType } from '../shared/enums/command-type.enum';
import { DeleteAdminCommand } from './commands/delete-admin.command';
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit, OnDestroy {

  public users$ = new BehaviorSubject<IBrowserUserModel[]>([]);
  public subNavigationOptions = new Array<ISubNavigationOptions>();

  private destroyed$ = new Subject<void>();

  constructor(
    private store: Store,
    private actions: Actions,
    private addAdminCommand: AddAdminCommand,
    private deleteAdminCommand: DeleteAdminCommand) {}

  ngOnInit(): void {
    this.subNavigationOptions.push({
      commandType: CommandType.noSelection,
      text: 'ADD',
      customLinkCssClasses: 'btn btn-success me-2',
      action: () => {
        this.addAdminCommand.execute();
      }
    },
    {
      commandType: CommandType.singleSelection,
      text: 'EDIT',
      customLinkCssClasses: 'btn btn-primary me-2',
      action: () => {
        console.warn('EDIT')
      }
    },
    {
      commandType: CommandType.multiSelection,
      text: 'DELETE',
      customLinkCssClasses: 'btn btn-danger me-2',
      action: () => {
        this.deleteAdminCommand.execute();
      }
    },
    {
      commandType: CommandType.singleSelection,
      text: 'OPEN_IN_POPUP',
      customLinkCssClasses: 'btn btn-warning me-2',
      action: () => {
        console.warn('OPEN_IN_POPUP')
      }
    });

    this.store.dispatch(new GetAdminViewInfo());
    this.actions.pipe(
      ofActionCompleted(GetAdminViewInfo),
      takeUntil(this.destroyed$))
        .subscribe(() => {
          this.users$.next(
            this.store.selectSnapshot(AdminState.users))
        });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
