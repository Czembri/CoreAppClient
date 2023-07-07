import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductsRoutingModule } from "./product-routing.module";
import { TranslateModule } from '@ngx-translate/core';
import { SlickgridBaseModule } from '../slickgrid-base/slickgrid-base.module';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from './state/products.state';
import { ProductsComponent } from './products.component';


@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    SlickgridBaseModule,
    NgxsModule.forFeature([ProductsState]),
  ],
})
export class ProductsModule { }
