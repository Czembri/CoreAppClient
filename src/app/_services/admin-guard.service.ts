import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { RoleService } from '../shared/roles/services/role.service';
@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private injector: Injector, public router: Router) {}
  canActivate(): boolean {
    const auth = this.injector.get(RoleService);
    console.warn('TEST')
    if (!auth.hasRole('Admin')) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
