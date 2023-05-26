import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AdminState } from './state/admin.state';
import { GetAdminViewInfo } from './state/admin.actions';
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  constructor(private store: Store) {
    console.warn('constr')
    this.store.dispatch(new GetAdminViewInfo());
  }
}
