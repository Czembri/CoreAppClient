import { Component, Inject } from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-http-error-dialog',
  templateUrl: './http-error-dialog.component.html',
  styleUrls: ['./http-error-dialog.component.css']
})
export class HttpErrorDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ErrorMessageData,
    public dialogRef: MatDialogRef<HttpErrorDialogComponent>) { }

  close() {
    this.dialogRef.close();
  }

}

export interface ErrorMessageData {
  title: string;
  content: string;
}
