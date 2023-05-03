import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILogin } from '../nav/login.model';
import { DialogService } from '../shared/services/dialog.service';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public registerMode = false;
  model: ILogin;
  username: string;
  password: string;
  loginValid = true;
  
  constructor(public accountService: AccountService, private dialogService: DialogService) {}

  ngOnInit(): void {
  }
  
  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  onSubmit() {
    this.model = { username: this.username, password: this.password };
    this.accountService.login(this.model).subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.loginValid = false;
          this.dialogService.openErrorDialog("Unauthorized", "Wrong username or password!");
        }
      }
    });
  }

}
