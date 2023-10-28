import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../_models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = 'http://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getProduct(id: number) {
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
  }

  getProducts() {
    return this.http.get<IProduct[]>(`${this.baseUrl}products`);
  }

  getProductImage(id: number) {
    return this.http.get<any>(`${this.baseUrl}products/${id}/image`, {
      'responseType'  : 'arraybuffer' as 'json'
    });
  }
  getProductImage2(id: number) {
    return this.http.get<any>(`${this.baseUrl}products/${id}/image2`);
  }

  getProductImage3(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}products/${id}/image`, { responseType: 'blob' });
  }

  updateProduct(product: IProduct) {
    return this.http.put<boolean>(`${this.baseUrl}products/${product.id}`, product);
  }

  patchProductDescription(id: number) {
    return this.http.patch<string>(`${this.baseUrl}products/${id}/description`, null);
  }
  patchProductImage(id: number) {
    return this.http.patch<string>(`${this.baseUrl}products/${id}/image`, null);
  }
}
