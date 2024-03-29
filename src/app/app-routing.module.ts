import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminGuardService } from './_services/admin-guard.service';
import { AuthGuardService } from './_services/auth-guard.service';
import { PasswordReminderComponent } from './home/password-reminder/password-reminder.component';

const routes: Routes = [
  {
    path: 'reminder', component: PasswordReminderComponent
  },
  {
    path: 'user-receipts',
    loadChildren: () => import('./user-receipts/user-receipts.module').then(m => m.UserReceiptsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuardService]
  },
  {
    path: 'contractors',
    loadChildren: () => import('./contractors/contractors.module').then(m => m.ContractorsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'products',
    loadChildren: () => import('./products/product.module').then(m => m.ProductsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'law-ai',
    loadChildren: () => import('./law-ai/law-ai.module').then(m => m.LawAIModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'document-generator',
    loadChildren: () => import('./law-document-generator/law-document.module').then(m => m.LawDocumentModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'chat-cards',
    loadComponent: () => import('./chat-cards/chat-cards.component').then(m => m.ChatCardsComponent),
    canActivate: [AuthGuardService]
  },
  {
    path: 'document-analyzer',
    loadComponent: () => import('./document-analyzer/document-analyzer.component').then(m => m.DocumentAnalyzerComponent),
    canActivate: [AuthGuardService]
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
