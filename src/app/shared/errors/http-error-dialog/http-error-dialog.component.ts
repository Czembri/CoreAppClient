import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-http-error-dialog',
  templateUrl: './http-error-dialog.component.html',
  styleUrls: ['./http-error-dialog.component.css']
})
export class HttpErrorDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorMessageData, public dialogRef: MatDialogRef<HttpErrorDialogComponent>) { }
  
  close() {
    this.dialogRef.close();
  }

}

export interface ErrorMessageData {
  title: string;
  content: string;
}