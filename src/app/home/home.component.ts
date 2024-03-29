import { Component, OnInit } from '@angular/core';
import { ILogin } from '../nav/login.model';
import { AccountService } from '../_services/account.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LawAIState } from '../law-ai/state/law-ai.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private isLoadingLocal$ = new BehaviorSubject<boolean>(false);
  registerMode = false;
  model: ILogin;
  username: string;
  password: string;
  loginValid = true;
  isLoading$ = this.store.select(LawAIState.isLoading).pipe(
    switchMap(() => this.isLoadingLocal$),
  );

  user$ = this.accountService.currentUser$;

  constructor(
    public accountService: AccountService,
    private router: Router, public store: Store) {}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  onSubmit() {
    this.isLoadingLocal$.next(true);
    this.model = { username: this.username, password: this.password };
    this.accountService.login(this.model).subscribe({
      next: () => window.location.reload(),
      complete: () => this.isLoadingLocal$.next(false)
    });
  }

  redirectTo(uri: string) {
    //DEV!!!!!!!!
    this.router.navigate([uri]).then(
      () => window.location.reload());
 }

}
