import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./header.component";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";

@NgModule({
    declarations: [
      HeaderComponent,
    ],
    exports: [
      HeaderComponent
    ],
    entryComponents: [
      HeaderComponent
    ],
    imports: [
      TranslateModule,
      MatDialogModule,
      DragDropModule,
      MatIconModule,
      MatButtonModule
    ],
})
export class HeaderModule { }
