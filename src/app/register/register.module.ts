import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { RegisterComponent } from "./register.component";


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
  ],
  entryComponents: [
    RegisterComponent,
  ], exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }