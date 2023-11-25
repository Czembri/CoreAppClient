import { NgModule } from "@angular/core";
import { HttpErrorDialogComponent } from "./errors/http-error-dialog/http-error-dialog.component";
import { DialogService } from "./services/dialog.service";
import { TranslateModule } from "@ngx-translate/core";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EvenOddPipe } from './pipes/even-odd.pipe';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@NgModule({
    declarations: [
        HttpErrorDialogComponent,
        EvenOddPipe,
    ],
    exports: [
        HttpErrorDialogComponent,
        EvenOddPipe,
    ],
    imports: [
        MatDialogModule,
        TranslateModule,
        DragDropModule
    ],
    providers: [DialogService,
        { provide: MatDialogRef, useValue: {} },
	    { provide: MAT_DIALOG_DATA, useValue: [] },
    ]
})
export class SharedModule { }
