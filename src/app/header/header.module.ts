import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./header.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    declarations: [
      HeaderComponent,
    ],
    exports: [
      HeaderComponent
    ],
    imports: [
      TranslateModule,
      DragDropModule,
      MatIconModule,
      MatButtonModule,
      MatDialogModule,
    ],
})
export class HeaderModule { }
