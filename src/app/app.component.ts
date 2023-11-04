import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import {TranslateService} from "@ngx-translate/core";
import { Route, Router } from '@angular/router';

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
   private router: Router,
   translateService: TranslateService) {
    translateService.setDefaultLang('pl');
    translateService.use('pl');
  }

  ngOnInit(): void {
    this.setCurrentUser();
    this.printpath('', this.router.config);
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

  printpath(parent: String, config: Route[]) {
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      console.log(parent + '/' + route.path);
      if (route.children) {
        const currentPath = route.path ? parent + '/' + route.path : parent;
        this.printpath(currentPath, route.children);
      }
    }
  }
}
