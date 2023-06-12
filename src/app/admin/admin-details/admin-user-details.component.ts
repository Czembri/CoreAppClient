import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as moment from "moment";
import { Subject } from "rxjs";
import { ICommandsDataTypeModel } from "src/app/shared/models/commands-data-type.model";

@Component({
  selector: 'admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUserDetailsComponent implements OnInit, OnDestroy {

  public adminForm: FormGroup;

  private destroyed$ = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA)
  public dialogData: ICommandsDataTypeModel,
  public dialogRef: MatDialogRef<AdminUserDetailsComponent>) {}

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      login: new FormControl(''),
      creationDate: new FormControl({value: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), disabled: true}),
      modificationDate: new FormControl({value: '', disabled: true}),
      roles: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl(''),
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
