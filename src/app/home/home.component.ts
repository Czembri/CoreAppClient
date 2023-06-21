import { Component } from '@angular/core';
import { ILogin } from '../nav/login.model';
import { AccountService } from '../_services/account.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public registerMode = false;
  model: ILogin;
  username: string;
  password: string;
  loginValid = true;
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    public accountService: AccountService,
    private router: Router) {}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  onSubmit() {
    this.isLoading$.next(true);
    this.model = { username: this.username, password: this.password };
    this.accountService.login(this.model).subscribe({
      next: () => window.location.reload(),
      complete: () => this.isLoading$.next(false)
    });
  }

  redirectTo(uri: string) {
    //DEV!!!!!!!!
    this.router.navigate([uri]).then(
      () => window.location.reload());
 }

}
