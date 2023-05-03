import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { SubNavigationComponent } from "./sub-navigation.component";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    SubNavigationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    BrowserModule,
    TranslateModule,
  ],
  entryComponents: [
    SubNavigationComponent,
  ],
  exports: [
    SubNavigationComponent
  ]
})
export class SubNavigationModule { }
