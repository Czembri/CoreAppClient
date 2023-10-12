import { Injectable } from '@angular/core';
import { CommandProviderService } from 'src/app/shared/services/command-provider.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AdminUserDetailsComponent } from '../admin-details/admin-user-details.component';
import { IBrowserUserModel } from '../models/user.model';
import { ICommandsDataTypeModel } from 'src/app/shared/models/commands-data-type.model';

@Injectable({
  providedIn: 'root'
})
export class AddAdminCommand {
  constructor(
    private commandProviderService: CommandProviderService,
    private dialogService: DialogService) {}

  execute(): void {
    const selectedRowData = this.commandProviderService.getSelectedRowData() as IBrowserUserModel;

    this.dialogService.openDialog(AdminUserDetailsComponent, {
      data: <ICommandsDataTypeModel> {
        data: selectedRowData,
        titleKey: 'ADD'
      },
      width: '1000px',
    });
  }
}
