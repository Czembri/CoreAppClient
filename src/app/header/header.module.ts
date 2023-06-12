import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./header.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

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
