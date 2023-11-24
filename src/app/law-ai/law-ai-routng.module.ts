import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../_services/auth-guard.service';
import { LawAIComponent } from './law-ai.component';

const routes: Routes = [
  {
    path: ':id',
    component: LawAIComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: LawAIComponent,
    canActivate: [AuthGuardService]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class LawAIRoutingModule { }
