import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { GetContractors } from './state/contractors.actions';
import { Actions, Store, ofActionCompleted } from '@ngxs/store';
import { ISubNavigationOptions } from '../sub-navigation/sub-nav.model';
import { ContractorsState } from './state/contractors.state';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { EditContractorsCommand } from './commands/edit.command';
import { DeleteContracorsCommand } from './commands/delete.command';

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

  constructor(
    private editContractorsCommand: EditContractorsCommand,
    private deleteContractorsCommand: DeleteContracorsCommand,
    private store: Store,
    private actions: Actions) {
    this.subNavigationOptions.push({
      text: 'ADD',
      customLinkCssClasses: 'btn btn-success me-2',
      action: () => {
        console.warn('add')
      }
    },
    {
      text: 'EDIT',
      customLinkCssClasses: 'btn btn-primary me-2',
      action: () => {
        console.warn('EDIT')
        this.editContractorsCommand.execute();
      }
    },
    {
      text: 'DELETE',
      customLinkCssClasses: 'btn btn-danger me-2',
      action: () => {
        console.warn('DELETE')
        this.deleteContractorsCommand.execute();
      }
    },
    {
      text: 'OPEN_IN_POPUP',
      customLinkCssClasses: 'btn btn-warning me-2',
      action: () => {
        console.warn('OPEN_IN_POPUP')
      }
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
