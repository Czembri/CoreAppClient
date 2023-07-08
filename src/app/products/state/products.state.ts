import { ProductsService } from 'src/app/_services/products.service';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, map, tap, throwError } from 'rxjs';
import { BaseState } from 'src/app/_models/base-state.model';
import { GetProduct, GetProductFailed, GetProductSuccess, GetProducts, GetProductsFailed, GetProductsSuccess } from './products.actions';
import { IProduct } from 'src/app/_models/product.model';
import * as moment from 'moment';
import { STANDARD_DATE_TIME_FORMAT } from 'src/app/shared/constants/date-formats';
import { IBrowserProductModel } from '../models/products.model';

export interface ProductsStateModel extends BaseState {
  products: IBrowserProductModel[],
  productForm?: {
    model: IProduct
  }
}

@State<ProductsStateModel>({
  name: 'Products',
  defaults: {
    products: [{
      id: null,
      name: '',
      description: '',
      modificationDate: null,
      creationDate: null,
    }],
    productForm: {
      model: undefined
    },
    errors: []
  }
})

@Injectable()
export class ProductsState {
  constructor(private productsService: ProductsService) {}

  @Selector()
  public static products(state: ProductsStateModel) {
    return state.products.map(dto => ({
      id: dto.id,
      description: dto.description,
      creationDate: (moment(dto.creationDate)).format(STANDARD_DATE_TIME_FORMAT),
      modificationDate: (moment(dto.modificationDate)).format(STANDARD_DATE_TIME_FORMAT),
      name: dto.name
    }))
  }

  @Action(GetProducts)
  public getProducts(ctx: StateContext<ProductsStateModel>) {
    const productsArray = new Array<IBrowserProductModel>;
    return this.productsService.getProducts().pipe(
      map(products => {
        products.forEach(dto => {
          productsArray.push({
            id: dto.id,
            description: dto.description,
            name: dto.name,
            creationDate: dto.creationDate,
            modificationDate: dto.modificationDate,
          })
        })

        return productsArray;
      }),
      tap(products => ctx.dispatch(new GetProductsSuccess(products))),
      catchError(error => {
        ctx.dispatch(new GetProductsFailed());
        return throwError(() => error)
      }),
    );
  }


  @Action(GetProduct)
  public getProduct(ctx: StateContext<ProductsStateModel>, { productId }: GetProduct) {
    return this.productsService.getProduct(productId).pipe(
      map(product => {
        return {
          id: product.id,
          description: product.description,
          creationDate: product.creationDate,
          modificationDate: product.modificationDate,
          productProperty: product.productProperty
        } as IProduct
      }),
      tap(product => ctx.dispatch(new GetProductSuccess(product))),
      catchError(error => {
        ctx.dispatch(new GetProductFailed());
        return throwError(() => error)
      }),
    );
  }

  @Action(GetProductsSuccess)
  getProductsSuccess(ctx: StateContext<ProductsStateModel>, { products }: GetProductsSuccess) {
    ctx.setState({
      products: products
    });
  }

  @Action(GetProductSuccess)
  getProductSuccess(ctx: StateContext<ProductsStateModel>, { product }: GetProductSuccess) {
    ctx.patchState({
      productForm: {
        model: product
      }
    });
  }
}
