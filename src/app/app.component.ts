import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import {TranslateService} from "@ngx-translate/core";
import { TranslatePartialLoader } from 'angular-translate-loader-partial';

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
   private translateService: TranslateService) {
    translateService.setDefaultLang('pl');
    translateService.use('pl');
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

    this.translateService.getTranslation('pl').subscribe(ee => console.warn(ee))
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
