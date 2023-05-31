import { Injectable } from '@angular/core';
import { CommandProviderService } from 'src/app/shared/services/command-provider.service';

@Injectable({
  providedIn: 'root'
})
export class EditContractorsCommand {
  constructor(private commandProviderService: CommandProviderService) {}

  execute(): void {
    const selectedRowData = this.commandProviderService.getSelectedRowData();
    console.warn(selectedRowData, 'selectedRowData edit')
  }
}
