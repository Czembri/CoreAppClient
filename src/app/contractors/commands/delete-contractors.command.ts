import { Injectable } from '@angular/core';
import { CommandProviderService } from 'src/app/shared/services/command-provider.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteContractorsCommand {

  private selectedRowsData = new Array<object>;

  constructor(private commandProviderService: CommandProviderService) {
    this.selectedRowsData = this.commandProviderService.getSelectedRowsData();
  }

  execute(): void {
    console.warn(this.selectedRowsData, 'selectedRowData edit')
  }
}
