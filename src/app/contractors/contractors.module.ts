import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { NgxsModule } from "@ngxs/store";
import { MaterialsModule } from "../materials.module";
import { SlickgridBaseModule } from "../slickgrid-base/slickgrid-base.module";
import { SubNavigationModule } from "../sub-navigation/sub-navigation.module";
import { ContractorsState } from "./state/contractors.state";
import { ContractorsComponent } from "./contractors.component";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    ContractorsComponent
  ],
  entryComponents: [
    ContractorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    SubNavigationModule,
    MaterialsModule,
    SlickgridBaseModule,
    NgxsModule.forFeature([ContractorsState]),
  ]
})
export class ContractorsModule { }
