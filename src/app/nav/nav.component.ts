import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { NavigationItem } from './models/nav-item.model';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Role, RoleString } from '../shared/roles/enums/role.enum';
import { environment } from 'src/environments/environment';
import { RoleService } from '../shared/roles/services/role.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {

  public navItemsList = new Array<NavigationItem>;
  public roleEnum = Role;

  private destroyed$ = new Subject<void>();

  constructor(
    public roleService: RoleService,
    public accountService: AccountService,
    private translate: TranslateService,
    private router: Router) {}

  ngOnInit(): void {
    // DEV
    if (!environment.production) {
      this.translate.getTranslation(this.translate.currentLang)
        .pipe(takeUntil(this.destroyed$)).subscribe(translation => {
        this.navItemsList.push(<NavigationItem>{
          class: 'nav-link',
          url: '/user-receipts',
          translation: translation['USER_RECEIPTS'],
          visible: this.roleService.hasRole(RoleString.SuperAdmin)
        });

        this.navItemsList.push(<NavigationItem>{
          class: 'nav-link',
          url: '/contractors',
          translation: translation['CONTRACTORS'],
          visible: this.roleService.hasRole(RoleString.SuperAdmin)
        });

        this.navItemsList.push(<NavigationItem>{
          class: 'nav-link',
          url: '/law-ai',
          translation: translation['LAW-AI'],
          visible: this.roleService.hasRole(RoleString.Admin)
        });
      });
    }
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
