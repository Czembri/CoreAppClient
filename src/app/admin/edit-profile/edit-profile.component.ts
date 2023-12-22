import { GetUserByUsername } from './../state/admin.actions';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AccountService } from 'src/app/_services/account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { postalCodePattern } from 'src/app/shared/patterns/validation-patterns';
import { AdminState } from '../state/admin.state';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  public formGroup: FormGroup
  public isLoading$ = this.store.select(AdminState.isLoading);

  constructor(private store: Store, accountService: AccountService) {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl('', Validators.compose([Validators.pattern(postalCodePattern)])),
    });
    store.dispatch(new GetUserByUsername(accountService.getCurrentUser().userName));
   }

   public onSubmit(): void {
    // dispatch save profile
   }
}
