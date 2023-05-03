import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReceipt } from '../_models/receipt.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {
  baseUrl = 'http://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getReceipts() {
    return this.http.get<Array<IReceipt>>(`${this.baseUrl}receipts`);
  }
}
