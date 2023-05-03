import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private injector: Injector, public router: Router) {}
  canActivate(): boolean {
    const auth = this.injector.get(AuthService);
    if (!auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}