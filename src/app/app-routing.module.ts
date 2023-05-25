import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserReceiptsComponent } from './user-receipts/user-receipts.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { ContractorsComponent } from './contractors/contractors.component';
import { AdminGuardService } from './_services/admin-guard.service';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  // {
  //   path: 'user-receipts', component: UserReceiptsComponent, canActivate: [AuthGuardService]
  // },
  {
    path: 'contractors', component: ContractorsComponent, canActivate: [AuthGuardService]
  },
  {
    path: '**', component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'user-receipts', loadChildren: () => import('./user-receipts/user-receipts.module').then(m => m.UserReceiptsModule), canActivate: [AuthGuardService]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),  canActivate: [AdminGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
