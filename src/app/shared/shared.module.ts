import { NgModule } from "@angular/core";
import { HttpErrorDialogComponent } from "./errors/http-error-dialog/http-error-dialog.component";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from "./services/dialog.service";

@NgModule({
    declarations: [
        HttpErrorDialogComponent,
    ],
    exports: [
        HttpErrorDialogComponent
    ],
    entryComponents: [
        HttpErrorDialogComponent
    ],
    imports: [
        MatDialogModule
    ],
    providers: [DialogService, 
        { provide: MatDialogRef, useValue: {} },
	    { provide: MAT_DIALOG_DATA, useValue: [] },
    ]
})
export class SharedModule { }