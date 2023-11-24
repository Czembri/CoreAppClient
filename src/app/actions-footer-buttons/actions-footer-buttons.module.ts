import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
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
