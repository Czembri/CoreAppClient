import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { NgxsModule } from "@ngxs/store";
import { MaterialsModule } from "../materials.module";
import { SlickgridBaseModule } from "../slickgrid-base/slickgrid-base.module";
import { UserReceiptsState } from "./state/user-receipts.state";
import { UserReceiptsComponent } from "./user-receipts.component";
import { UserReceipsRoutingModule } from "./user-receipts-routing.module";


@NgModule({
  declarations: [
      UserReceiptsComponent
  ],
  entryComponents: [
    UserReceiptsComponent
  ],
  imports: [
    UserReceipsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MaterialsModule,
    SlickgridBaseModule,
    NgxsModule.forFeature([UserReceiptsState]),
  ]
})
export class UserReceiptsModule { }
