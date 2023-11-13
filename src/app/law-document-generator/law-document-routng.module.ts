import { LawDocumentGeneratorComponent } from './law-document-generator.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../_services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LawDocumentGeneratorComponent,
    canActivate: [AuthGuardService]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class LawDocumentRoutingModule { }
