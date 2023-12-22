import { Injectable } from '@angular/core';
import { CommandProviderService } from 'src/app/shared/services/command-provider.service';
import { AdminUserDetailsComponent } from '../admin-details/admin-user-details.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ICommandsDataTypeModel } from 'src/app/shared/models/commands-data-type.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsAdminCommand {
  constructor(
    private commandProviderService: CommandProviderService,
    private dialogService: DialogService) {}

  execute(): void {
    const selectedRowsData = this.commandProviderService.getSelectedRowData();

    this.dialogService.openDialog(AdminUserDetailsComponent, {
      data: <ICommandsDataTypeModel> {
        data: selectedRowsData,
        titleKey: 'DETAILS',
        readonly: true
      },
      width: '1000px',
      height: '600px'
    });
  }
}
