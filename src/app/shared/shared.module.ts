import { NgModule } from "@angular/core";
import { HttpErrorDialogComponent } from "./errors/http-error-dialog/http-error-dialog.component";
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { DialogService } from "./services/dialog.service";
import { TranslateModule } from "@ngx-translate/core";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EvenOddPipe } from './pipes/even-odd.pipe';

@NgModule({
    declarations: [
        HttpErrorDialogComponent,
        EvenOddPipe,
    ],
    exports: [
        HttpErrorDialogComponent,
        EvenOddPipe,
    ],
    entryComponents: [
        HttpErrorDialogComponent
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
