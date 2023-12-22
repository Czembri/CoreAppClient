import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandProviderService {
  private selectedRowData: object;
  private selectedRowsData = new Array<object>;

  getSelectedRowData(): object {
    return this.selectedRowData;
  }

  getSelectedRowsData(): Array<object> {
    return this.selectedRowsData;
  }

  setSelectedRowData(rowData: object): void {
    this.selectedRowData = rowData;
  }

  setSelectedRowsData(rowsData: object): void {
    this.selectedRowsData.push(rowsData);
  }

  clearRowsData(): void {
    this.selectedRowsData = [];
  }
}
