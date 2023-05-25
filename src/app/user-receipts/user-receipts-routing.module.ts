import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../_services/auth-guard.service';
import { UserReceiptsComponent } from './user-receipts.component';

const routes: Routes = [
//   {
//     path: 'new',
//     component: UserReceiptComponent
//   },
,
  {
    path: '', component: UserReceiptsComponent, canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserReceipsRoutingModule { }
