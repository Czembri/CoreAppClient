import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import * as moment from "moment";
import { Subject } from "rxjs";
import { ICommandsDataTypeModel } from "src/app/shared/models/commands-data-type.model";
import { postalCodePattern } from "src/app/shared/patterns/validation-patterns";
import { Role } from "src/app/shared/roles/enums/role.enum";
import { AddNewAdminForm, SetAdminForm, UpdateAdminForm } from "../state/admin.actions";

@Component({
  selector: 'admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  private store: Store,
  private dialogRef: MatDialogRef<AdminUserDetailsComponent>) {}

  public ngOnInit(): void {
    this.adminForm = new FormGroup({
      id: new FormControl(''),
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

    this.store.dispatch(new SetAdminForm(this.dialogData.data));
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onSubmit() {
    if (this.adminForm.value.id) {
      this.store.dispatch(new UpdateAdminForm());
    } else {
      this.store.dispatch(new AddNewAdminForm());
    }
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
