import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products.component';
import { AuthGuardService } from '../_services/auth-guard.service';

const routes: Routes = [
  {
    path: ':id', component: ProductDetailsComponent
  },
  {
    path: '',
    component: ProductsComponent,
    canActivate: [AuthGuardService]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ProductsRoutingModule { }
