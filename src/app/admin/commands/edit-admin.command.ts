import { Injectable } from '@angular/core';
import { CommandProviderService } from 'src/app/shared/services/command-provider.service';

@Injectable({
  providedIn: 'root'
})
export class EditAdminCommand {
  constructor(private commandProviderService: CommandProviderService) {}

  execute(): void {
    const selectedRowsData = this.commandProviderService.getSelectedRowsData();
    console.warn(selectedRowsData, 'EditAdminCommand selectedRowData edit')
  }
}
