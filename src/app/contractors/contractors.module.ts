import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { MaterialsModule } from "../materials.module";
import { SlickgridBaseModule } from "../slickgrid-base/slickgrid-base.module";
import { ContractorsState } from "./state/contractors.state";
import { ContractorsComponent } from "./contractors.component";
import { CommonModule } from "@angular/common";
import { ContractorsRoutingModule } from "./contractors-routing.module";


@NgModule({
  declarations: [
    ContractorsComponent
  ],
  imports: [
    ContractorsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    SlickgridBaseModule,
    NgxsModule.forFeature([ContractorsState]),
  ]
})
export class ContractorsModule { }
