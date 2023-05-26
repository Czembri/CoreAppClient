import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminGuardService } from './_services/admin-guard.service';

const routes: Routes = [
  {
    path: 'user-receipts', loadChildren: () => import('./user-receipts/user-receipts.module').then(m => m.UserReceiptsModule)
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuardService]
  },
  {
    path: 'contractors', loadChildren: () => import('./contractors/contractors.module').then(m => m.ContractorsModule)
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: '**', component: HomeComponent, pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
