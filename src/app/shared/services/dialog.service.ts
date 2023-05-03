import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorDialogComponent, ErrorMessageData } from '../errors/http-error-dialog/http-error-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

  constructor(public readonly dialog: MatDialog) {}

   public openErrorDialog(title: string, content: string) {
    this.dialog.open(HttpErrorDialogComponent, {
        width: '350px',
        data: {
          title: title,
          content: content
        } as ErrorMessageData,
      });
    }
}