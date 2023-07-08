import { Injectable } from '@angular/core';
import { CommandProviderService } from 'src/app/shared/services/command-provider.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ICommandsDataTypeModel } from 'src/app/shared/models/commands-data-type.model';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { IBrowserProductModel } from '../models/products.model';
import { Store } from '@ngxs/store';
import { GetProduct } from '../state/products.actions';

@Injectable({
  providedIn: 'root'
})
export class ShowProductCommand {
  constructor(
    private commandProviderService: CommandProviderService,
    private dialogService: DialogService,
    private store: Store) {}

  execute(): void {
    const selectedRowData = this.commandProviderService.getSelectedRowData() as IBrowserProductModel;
    this.store.dispatch(new GetProduct(selectedRowData.id));
    this.dialogService.openDialog(ProductDetailsComponent, {
      data: <ICommandsDataTypeModel> {
        data: selectedRowData,
        titleKey: 'EDIT'
      },
      width: '1000px',
      height: '600px'
    });
  }
}
