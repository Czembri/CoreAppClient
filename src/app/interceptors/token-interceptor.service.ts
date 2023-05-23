import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AccountService } from '../_services/account.service';
import { DialogService } from '../shared/services/dialog.service';
import { HttpErrorModel } from '../shared/errors/models/http-error.model';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private accountService: AccountService,
    private dialogService: DialogService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { token } = this.accountService.getCurrentUser();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.accountService.logout();
        }
        const errorModel: HttpErrorModel = {
          error: err.error.error,
          httpStatusCode: err.error.httpStatusCode
        }
        this.dialogService.openErrorDialog(err.statusText, errorModel.error);
        return of();
      })
    );
  }
}
