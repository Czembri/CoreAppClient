import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { RegisterComponent } from "./register.component";
import { MatTableModule } from "@angular/material/table";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    TranslateModule
  ], exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
