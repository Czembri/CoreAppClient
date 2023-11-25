import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { RegisterComponent } from "./register.component";
import { MatTableModule } from "@angular/material/table";


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
  ], exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
