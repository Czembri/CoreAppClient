import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

  constructor(public readonly dialog: MatDialog) {}

   public getError(controlName: string) {

   }
}
