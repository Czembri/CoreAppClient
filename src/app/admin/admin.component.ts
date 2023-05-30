import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, Store, ofActionCompleted } from '@ngxs/store';
import { AdminState } from './state/admin.state';
import { GetAdminViewInfo } from './state/admin.actions';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { IBrowserUserModel } from './models/user.model';
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit, OnDestroy {

  public users$ = new BehaviorSubject<IBrowserUserModel[]>([]);
  private destroyed$ = new Subject<void>();

  constructor(private store: Store, private actions: Actions) {}

  ngOnInit(): void {
    this.store.dispatch(new GetAdminViewInfo());
    this.actions.pipe(
      ofActionCompleted(GetAdminViewInfo),
      takeUntil(this.destroyed$))
        .subscribe(() => {
          console.warn('xx',  this.store.selectSnapshot(AdminState.users))
          this.users$.next(
            this.store.selectSnapshot(AdminState.users))
        });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
