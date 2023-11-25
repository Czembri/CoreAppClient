import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { NgxsModule } from "@ngxs/store";
import { AngularSlickgridModule } from "angular-slickgrid";
import { SlickgridBaseComponent } from "./slickgrid-base.component";
import { BrowserState } from "./state/browser.state";
import { CommonModule } from "@angular/common";
import { SubNavigationModule } from "../sub-navigation/sub-navigation.module";
import { MatTableModule } from "@angular/material/table";


@NgModule({
  declarations: [
    SlickgridBaseComponent
  ],
  imports: [
    CommonModule,
    SubNavigationModule,
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
