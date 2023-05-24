import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { NavigationItem } from './models/nav-item.model';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Role } from '../shared/roles/enums/role.enum';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {

  public navItemsList = new Array<NavigationItem>;
  public userRoles = new Array<string>;
  public roleEnum = Role;

  private destroyed$ = new Subject<void>();

  constructor(public accountService: AccountService,
    private translate: TranslateService,
    private router: Router) {

    this.userRoles = this.accountService.getCurrentUserRoles();
  }

  ngOnInit(): void {
    this.translate.getTranslation(this.translate.currentLang)
      .pipe(takeUntil(this.destroyed$)).subscribe(translation => {
      this.navItemsList.push(<NavigationItem>{
        class: 'nav-link',
        url: '/user-receipts',
        translation: translation['USER_RECEIPTS'],
        visible: false
      });

      this.navItemsList.push(<NavigationItem>{
        class: 'nav-link',
        url: '/contractors',
        translation: translation['CONTRACTORS'],
        visible: false
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout() {
    this.accountService.logout();
  }

  goTo(url: string) {
    // DEV!!
    this.router.navigate([url]).then(
      () => window.location.reload());
  }
}
