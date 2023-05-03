import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { NgxsModule } from "@ngxs/store";
import { MaterialsModule } from "../materials.module";
import { SlickgridBaseModule } from "../slickgrid-base/slickgrid-base.module";
import { SubNavigationModule } from "../sub-navigation/sub-navigation.module";
import { UserReceiptsState } from "./state/user-receipts.state";
import { UserReceiptsComponent } from "./user-receipts.component";


@NgModule({
  declarations: [
      UserReceiptsComponent
  ],
  entryComponents: [
    UserReceiptsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    SubNavigationModule,
    MaterialsModule,
    SlickgridBaseModule,
    NgxsModule.forFeature([UserReceiptsState]),
  ]
})
export class UserReceiptsModule { }
