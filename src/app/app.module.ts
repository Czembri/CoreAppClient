import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { RegisterModule } from './register/register.module';
import { MaterialsModule } from './materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthService } from './_services/auth.service';
import { JwtHelperService, JWT_OPTIONS, JwtInterceptor } from '@auth0/angular-jwt';
import { BrowserService } from './_services/browser.service';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';
import { WebdatarocksPivotModule } from 'ng-webdatarocks';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ContractorsModule } from './contractors/contractors.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgxsRootModule } from '@ngxs/store/src/modules/ngxs-root.module';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { NavComponent } from './nav/nav.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AdminModule } from './admin/admin.module';
import { AccountService } from './_services/account.service';
import { AdminGuardService } from './_services/admin-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent
  ],
  imports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    SharedModule,
    ContractorsModule,
    RegisterModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
    WebdatarocksPivotModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    // NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  entryComponents: [
    HomeComponent,
    NavComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    AccountService,
    HttpClient,
    AuthGuardService,
    AdminGuardService,
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    BrowserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
