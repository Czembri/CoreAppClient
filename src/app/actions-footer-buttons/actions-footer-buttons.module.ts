import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ActionsFooterButtonsComponent } from "./actions-footer-buttons.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [
      ActionsFooterButtonsComponent,
    ],
    exports: [
      ActionsFooterButtonsComponent
    ],
    imports: [
      TranslateModule,
      MatDialogModule,
      MatButtonModule
    ],
})
export class ActionsFooterButtonsModule { }
