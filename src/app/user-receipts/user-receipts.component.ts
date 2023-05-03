import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, Select, Store, ofActionCompleted } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ISubNavigationOptions } from '../sub-navigation/sub-nav.model';
import { GetUserReceipts } from './state/user-receipts.actions';
import { UserReceiptsState, UserReceiptsStateModel } from './state/user-receipts.state';

@Component({
  selector: 'app-user-receipts',
  templateUrl: './user-receipts.component.html',
  styleUrls: ['./user-receipts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserReceiptsComponent implements OnInit, OnDestroy {

  // @Select(UserReceiptsState.userReceipts)
  // public userReceipts$: Observable<UserReceiptsStateModel[]>;

  public userReceipts$ = new BehaviorSubject<any[]>([]);
  public subNavigationOptions = new Array<ISubNavigationOptions>();

  private destroyed$ = new Subject<void>();

  constructor(private store: Store, private actions: Actions) {
    this.subNavigationOptions.push({
      text: 'ADD',
      customLinkCssClasses: 'btn btn-success me-2',
      url: '/user-receipts/new',
    },
    {
      text: 'EDIT',
      customLinkCssClasses: 'btn btn-success me-2',
      url: '',
    },
    {
      text: 'DELETE',
      customLinkCssClasses: 'btn btn-danger me-2',
      url: '',
    },
    {
      text: 'OPEN_IN_POPUP',
      customLinkCssClasses: 'btn btn-warning me-2',
      url: '',
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUserReceipts());
    this.actions.pipe(
      ofActionCompleted(GetUserReceipts),
      takeUntil(this.destroyed$)
    ).subscribe(() => this.userReceipts$.next(this.store.selectSnapshot(UserReceiptsState.userReceipts)));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
