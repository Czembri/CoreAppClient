import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { ActionsFooterButtonsComponent } from "./actions-footer-buttons.component";

@NgModule({
    declarations: [
      ActionsFooterButtonsComponent,
    ],
    exports: [
      ActionsFooterButtonsComponent
    ],
    entryComponents: [
      ActionsFooterButtonsComponent
    ],
    imports: [
      TranslateModule,
      MatDialogModule,
      MatButtonModule,
    ],
})
export class ActionsFooterButtonsModule { }
