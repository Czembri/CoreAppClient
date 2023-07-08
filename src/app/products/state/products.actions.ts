import { IProduct } from "src/app/_models/product.model";
import { IBrowserProductModel } from "../models/products.model";

export class GetProducts {
  static readonly type = '[PRODUCTS] Get products';
}

export class GetProduct {
  static readonly type = '[PRODUCTS] Get product';
  constructor(public productId: number) {}
}

export class GetProductSuccess {
  static readonly type = '[PRODUCTS] Get product success';
  constructor(public product: IProduct) {}
}

export class GetProductFailed {
  static readonly type = '[PRODUCTS] Get product failed';
}

export class GetProductsSuccess {
  static readonly type = '[PRODUCTS] Get products success';
  constructor(public products: IBrowserProductModel[]) {}
}

export class GetProductsFailed {
  static readonly type = '[PRODUCTS] Get products failed';
}
