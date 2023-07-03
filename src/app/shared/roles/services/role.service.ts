import { Injectable } from "@angular/core";
import { AccountService } from "src/app/_services/account.service";

@Injectable({
    providedIn: 'root'
})
export class RoleService {

  constructor(private accountService: AccountService) {}

  public hasRole(role: string): boolean {
    const userRoles = this.accountService.getCurrentUserRoles();
    return userRoles?.includes(role);
  }
}
