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
import { MaterialsModule } from '../materials.module';
import { ActionsFooterButtonsModule } from '../actions-footer-buttons/actions-footer-buttons.module';
import { HeaderModule } from '../header/header.module';


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
    MaterialsModule,
    TranslateModule,
    FormsModule,
    SlickgridBaseModule,
    HeaderModule,
    ActionsFooterButtonsModule,
    NgxsModule.forFeature([ProductsState]),
  ],
})
export class ProductsModule { }
