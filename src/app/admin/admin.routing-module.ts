import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from '../_services/admin-guard.service';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    canActivate: [AdminGuardService],
    path: '',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
