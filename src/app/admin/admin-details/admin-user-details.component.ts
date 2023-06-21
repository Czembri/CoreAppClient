import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, PatternValidator, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as moment from "moment";
import { Subject } from "rxjs";
import { ICommandsDataTypeModel } from "src/app/shared/models/commands-data-type.model";
import { passwordPattern, postalCodePattern } from "src/app/shared/patterns/validation-patterns";
import { Role } from "src/app/shared/roles/enums/role.enum";

@Component({
  selector: 'admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUserDetailsComponent implements OnInit, OnDestroy {

  public adminForm: FormGroup;
  public availableRoles = {
    [Role.Admin]: 'ADMIN_DETAILS.ADMIN',
    [Role.SuperAdmin]: 'ADMIN_DETAILS.SUPER_ADMIN',
    [Role.Moderator]: 'ADMIN_DETAILS.MODERATOR',
    [Role.Basic]: 'ADMIN_DETAILS.BASIC'
  }

  private destroyed$ = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA)
  public dialogData: ICommandsDataTypeModel,
  public dialogRef: MatDialogRef<AdminUserDetailsComponent>) {}

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      login: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      creationDate: new FormControl({value: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), disabled: true}),
      modificationDate: new FormControl({value: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), disabled: true}),
      roles: new FormControl('', Validators.compose([Validators.required])),
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl('', Validators.compose([Validators.pattern(postalCodePattern)])),
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit() {
    console.warn(this.adminForm, 'formmm')
  }
}
