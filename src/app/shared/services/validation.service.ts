import { Injectable } from "@angular/core";
import { AbstractControl, AbstractFormGroupDirective } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorDialogComponent, ErrorMessageData } from '../errors/http-error-dialog/http-error-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

  constructor(public readonly dialog: MatDialog) {}

   public getError(controlName: string) {

   }
}