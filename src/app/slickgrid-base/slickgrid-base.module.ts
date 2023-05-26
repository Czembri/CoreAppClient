import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { NgxsModule } from "@ngxs/store";
import { AngularSlickgridModule } from "angular-slickgrid";
import { SlickgridBaseComponent } from "./slickgrid-base.component";
import { BrowserState } from "./state/browser.state";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    SlickgridBaseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    AngularSlickgridModule.forRoot(),
    NgxsModule.forFeature([BrowserState]),
  ],
  exports: [
    SlickgridBaseComponent
  ]
})
export class SlickgridBaseModule { }
