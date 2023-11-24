import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService  {
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
