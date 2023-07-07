import { ProductsService } from 'src/app/_services/products.service';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, map, tap, throwError } from 'rxjs';
import { BaseState } from 'src/app/_models/base-state.model';
import { GetProducts, GetProductsFailed, GetProductsSuccess } from './products.actions';
import { IProductProperties } from 'src/app/_models/product.model';

export interface ProductsStateModel extends BaseState {
  id: number;
  name: string;
  description: string;
  productsProperties: IProductProperties
}

@State<ProductsStateModel[]>({
  name: 'Products',
  defaults: [{
    id: null,
    name: '',
    description: '',
    errors: [],
    productsProperties: undefined
  }]
})

@Injectable()
export class ProductsState {
  constructor(private productsService: ProductsService) {}

  @Selector()
  public static products(state: ProductsStateModel[]) {
    return state.map(dto => ({
      id: dto.id,
      description: dto.description,
      name: dto.name
    }))
  }

  @Action(GetProducts)
  public getProducts(ctx: StateContext<ProductsStateModel[]>) {
    return this.productsService.getProducts().pipe(
      map(products => {
        return products.map(dto => <ProductsStateModel>{
          id: dto.id,
          description: dto.description,
          name: dto.name,
          productsProperties: dto.productProperties
        })
      }),
      tap(products => ctx.dispatch(new GetProductsSuccess(products))),
      catchError(error => {
        ctx.dispatch(new GetProductsFailed());
        return throwError(() => error)
      }),
    );
  }

  @Action(GetProductsSuccess)
  getProductsSuccess(ctx: StateContext<ProductsStateModel[]>, { products }: GetProductsSuccess) {
    ctx.setState(products);
  }
}
