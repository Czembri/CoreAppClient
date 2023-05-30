import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { NgxsModule } from "@ngxs/store";
import { MaterialsModule } from "../materials.module";
import { SlickgridBaseModule } from "../slickgrid-base/slickgrid-base.module";
import { SubNavigationModule } from "../sub-navigation/sub-navigation.module";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin.routing-module";
import { AdminState } from "./state/admin.state";
import { AdminComponent } from "./admin.component";


@NgModule({
  declarations: [AdminComponent],
  entryComponents: [],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    SubNavigationModule,
    MaterialsModule,
    SlickgridBaseModule,
    NgxsModule.forFeature([AdminState]),
  ]
})
export class AdminModule {}
