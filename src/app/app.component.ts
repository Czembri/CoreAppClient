import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject<void>();
  public receiptsData$ = new BehaviorSubject<string>('');

  constructor(private accountService: AccountService,
    translate: TranslateService) {
      translate.setDefaultLang('pl');
      translate.use('pl');
    }

  ngOnInit(): void {
    this.setCurrentUser();

    // report
    // this.store.dispatch(new GetUserReceipts());
    // this.actions$.pipe(
    //   takeUntil(this.destroyed$),
    //   ofActionSuccessful(GetUserReceipts))
    //   .subscribe(() => {
    //     const receiptsStringData = JSON.stringify(this.store.selectSnapshot(UserReceiptsState.userReceiptsState));
    //     const reportSettings = JSON.stringify(
    //       JSON.parse(`{
    //         "dataSource": { "data": ${receiptsStringData} }
    //       }`)
    //     );
    //     this.receiptsData$.next(reportSettings);
    //   })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}
