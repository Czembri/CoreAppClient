import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { MaterialsModule } from "../materials.module";
import { SlickgridBaseModule } from "../slickgrid-base/slickgrid-base.module";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin.routing-module";
import { AdminState } from "./state/admin.state";
import { AdminComponent } from "./admin.component";
import { AdminUserDetailsComponent } from "./admin-details/admin-user-details.component";
import { HeaderModule } from "../header/header.module";
import { ActionsFooterButtonsModule } from "../actions-footer-buttons/actions-footer-buttons.module";
import { TranslateModule } from "@ngx-translate/core";
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { EditProfileComponent } from "./edit-profile/edit-profile.component";



@NgModule({
  declarations: [AdminComponent, AdminUserDetailsComponent, EditProfileComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    SlickgridBaseModule,
    NgxsModule.forFeature([AdminState]),
    HeaderModule,
    TranslateModule,
    NgxsFormPluginModule,
    ActionsFooterButtonsModule,
  ]
})
export class AdminModule {}
