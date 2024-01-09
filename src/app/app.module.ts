import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
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
import { ContractorsModule } from './contractors/contractors.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { AdminGuardService } from './_services/admin-guard.service';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { PasswordReminderComponent } from './home/password-reminder/password-reminder.component';
import { ActionsFooterButtonsModule } from './actions-footer-buttons/actions-footer-buttons.module';
import { ProductsModule } from './products/product.module';
import { ToastrModule } from 'ngx-toastr';
import { LawAIState } from './law-ai/state/law-ai.state';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PasswordReminderComponent
  ],
  imports: [
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
    ActionsFooterButtonsModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsFormPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpBackend]
        }
    }),
    ProductsModule,
    ToastrModule.forRoot(),
    NgxsModule.forFeature([LawAIState]), // for general usage
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
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
})
export class AppModule { }

export function HttpLoaderFactory(_httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(_httpBackend, [
    { prefix: './assets/i18n/admin/', suffix: '.json' },
    { prefix: './assets/i18n/products/', suffix: '.json' },
    { prefix: './assets/i18n/law-ai/', suffix: '.json' },
    { prefix: './assets/i18n/chat-cards/', suffix: '.json' },
    { prefix: './assets/i18n/', suffix: '.json' },
  ]);
}
