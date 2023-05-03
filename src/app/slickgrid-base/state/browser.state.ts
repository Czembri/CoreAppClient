import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Column, GridOption } from 'angular-slickgrid';
import { catchError, tap, throwError } from 'rxjs';
import { BaseState } from 'src/app/_models/base-state.model';
import { BrowserService } from 'src/app/_services/browser.service';
import { GetBrowserInfo, GetBrowserInfoFailed, GetBrowserInfoSuccess } from './browser.actions';
import { TranslateService } from '@ngx-translate/core';

export interface BrowserStateModel extends BaseState {
  browserName: string;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  data?: any[];
}

@State<BrowserStateModel>({
  name: 'browser',
  defaults: {
    browserName: '',
    columnDefinitions: [],
    gridOptions: {},
    data: [],
  }
})

@Injectable()
export class BrowserState {
  constructor(private browserService: BrowserService, private translate: TranslateService) {}

  @Selector()
  public static browserColumnDefinitions(state: BrowserStateModel) {
    return state.columnDefinitions;
  }

  @Selector()
  public static browserGridOptions(state: BrowserStateModel) {
    return state.gridOptions;
  }

  @Selector()
  public static browserData(state: BrowserStateModel) {
    return state.data;
  }

  @Action(GetBrowserInfo)
  public getBrowserInfo(ctx: StateContext<BrowserStateModel>, action: GetBrowserInfo) {
    return this.browserService.getBrowserInfo(action.browserName).pipe(
      tap(browser => {
        const columnSettings = JSON.parse(browser.columnDefinitions) as Column[];
        columnSettings.forEach(col => {
          col.name = this.translate.instant(col.field);
        });
        ctx.setState({
          browserName: browser.name,
          columnDefinitions: columnSettings,
          gridOptions: JSON.parse(browser.gridOptions)
        });
        ctx.dispatch(new GetBrowserInfoSuccess());
      }),
      catchError(error => {
        ctx.dispatch(new GetBrowserInfoFailed());
        return throwError(() => error)
      }),
    );
  }
}
