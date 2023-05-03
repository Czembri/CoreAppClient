import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { NgxsModule } from "@ngxs/store";
import { AngularSlickgridModule } from "angular-slickgrid";
import { SlickgridBaseComponent } from "./slickgrid-base.component";
import { BrowserState } from "./state/browser.state";


@NgModule({
  declarations: [
    SlickgridBaseComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    BrowserModule,
    AngularSlickgridModule.forRoot(),
    NgxsModule.forFeature([BrowserState]),
  ],
  exports: [
    SlickgridBaseComponent
  ]
})
export class SlickgridBaseModule { }
