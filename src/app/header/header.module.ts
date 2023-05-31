import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./header.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DragDropModule } from '@angular/cdk/drag-drop';

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
      DragDropModule
    ],
})
export class HeaderModule { }
