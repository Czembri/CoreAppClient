import { Injectable } from "@angular/core";
import { HttpErrorDialogComponent, ErrorMessageData } from '../errors/http-error-dialog/http-error-dialog.component';
import { ComponentType } from "ngx-toastr";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Injectable({
    providedIn: 'root'
})
export class DialogService {

  constructor(public readonly dialog: MatDialog) {}

   public openErrorDialog(title: string, content: string) {
    this.dialog.open(HttpErrorDialogComponent, {
        panelClass: 'error-dialog__style',
        data: {
          title: title,
          content: content
        } as ErrorMessageData,
      });
    }

   public openDialog(component: ComponentType<any>, config: MatDialogConfig) {
      this.dialog.open(component, config);
    }
}
