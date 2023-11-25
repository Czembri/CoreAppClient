import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { SlickgridBaseModule } from "../slickgrid-base/slickgrid-base.module";
import { UserReceiptsState } from "./state/user-receipts.state";
import { UserReceiptsComponent } from "./user-receipts.component";
import { UserReceipsRoutingModule } from "./user-receipts-routing.module";


@NgModule({
  declarations: [
      UserReceiptsComponent
  ],
  imports: [
    UserReceipsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickgridBaseModule,
    NgxsModule.forFeature([UserReceiptsState]),
  ]
})
export class UserReceiptsModule { }
