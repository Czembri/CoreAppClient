import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, Select, Store, ofActionCompleted } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ISubNavigationOptions } from '../sub-navigation/sub-nav.model';
import { GetProducts } from './state/products.actions';
import { ProductsState } from './state/products.state';
import { CommandType } from '../shared/enums/command-type.enum';
import { ShowProductCommand } from './commands/show-products.command';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products$ = new BehaviorSubject<any[]>([]);
  public subNavigationOptions = new Array<ISubNavigationOptions>();

  private destroyed$ = new Subject<void>();

  constructor(
    private store: Store,
    private actions: Actions,
    private showCommand: ShowProductCommand) {
    this.subNavigationOptions.push({
      commandType: CommandType.singleSelection,
      text: 'OPEN_IN_POPUP',
      customLinkCssClasses: 'btn btn-warning me-2',
      action: () => {
        this.showCommand.execute();
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
    this.actions.pipe(
      ofActionCompleted(GetProducts),
      takeUntil(this.destroyed$)
    ).subscribe(() => this.products$.next(this.store.selectSnapshot(ProductsState.products)));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
