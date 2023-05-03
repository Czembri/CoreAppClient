import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { IRregistrationModel } from './registration.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: IRregistrationModel;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string
  postalcode: string
  city: string

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    this.createModel();
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => console.log(error),
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  createModel() {
    this.model = {
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      address: this.address,
      postalCode: this.postalcode,
      city: this.city,
    }
  }

}
