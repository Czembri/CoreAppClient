import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserReceiptsComponent } from './user-receipts/user-receipts.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { ContractorsComponent } from './contractors/contractors.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'user-receipts', component: UserReceiptsComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'contractors', component: ContractorsComponent, canActivate: [AuthGuardService]
  },
  {
    path: '**', component: HomeComponent, pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
