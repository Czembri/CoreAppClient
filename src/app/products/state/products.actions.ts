import { ProductsStateModel } from "./products.state";

export class GetProducts {
  static readonly type = '[PRODUCTS] Get products';
}

export class GetProductsSuccess {
  static readonly type = '[PRODUCTS] Get user receipts success';
  constructor(public products: ProductsStateModel[]) {};
}

export class GetProductsFailed {
  static readonly type = '[PRODUCTS] Get user receipts failed';
}
