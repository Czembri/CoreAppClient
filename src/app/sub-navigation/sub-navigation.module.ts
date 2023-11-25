import { NgModule } from "@angular/core";
import { SubNavigationComponent } from "./sub-navigation.component";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    SubNavigationComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
  ],
  exports: [
    SubNavigationComponent
  ]
})
export class SubNavigationModule { }
