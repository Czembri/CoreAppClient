import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../shared/roles/services/role.service';
import { RoleString } from '../shared/roles/enums/role.enum';
@Injectable()
export class AdminGuardService  {
  constructor(private injector: Injector, public router: Router) {}
  canActivate(): boolean {
    const auth = this.injector.get(RoleService);
    if (!auth.hasRole(RoleString.Admin)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
