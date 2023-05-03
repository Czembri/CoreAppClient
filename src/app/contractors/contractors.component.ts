import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { GetContractors } from './state/contractors.actions';
import { Actions, Select, Store, ofActionCompleted, ofActionSuccessful } from '@ngxs/store';
import { ISubNavigationOptions } from '../sub-navigation/sub-nav.model';
import { ContractorsState, ContractorsStateModel } from './state/contractors.state';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorsComponent implements OnInit, OnDestroy {

  // @Select(ContractorsState.contractors)
  // public contractors$: Observable<ContractorsStateModel[]>;

  public contractors$ = new BehaviorSubject<any[]>([]);
  public subNavigationOptions = new Array<ISubNavigationOptions>();

  private destroyed$ = new Subject<void>();

  constructor(private store: Store, private actions: Actions) {
    this.subNavigationOptions.push({
      text: 'ADD',
      customLinkCssClasses: 'btn btn-success me-2',
      url: '/contractors/new',
    },
    {
      text: 'EDIT',
      customLinkCssClasses: 'btn btn-success me-2',
      url: '',
    },
    {
      text: 'DELETE',
      customLinkCssClasses: 'btn btn-danger me-2',
      url: '',
    },
    {
      text: 'OPEN_IN_POPUP',
      customLinkCssClasses: 'btn btn-warning me-2',
      url: '',
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetContractors());
    this.actions.pipe(
      ofActionCompleted(GetContractors),
      takeUntil(this.destroyed$))
        .subscribe(() => this.contractors$.next(
          this.store.selectSnapshot(ContractorsState.contractors)));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
