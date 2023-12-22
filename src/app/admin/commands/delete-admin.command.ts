import { Injectable } from '@angular/core';
import { CommandProviderService } from 'src/app/shared/services/command-provider.service';
import { IBrowserUserModel } from '../models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TranslationsService } from 'src/app/_services/translations.service';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from 'src/app/_services/admin.service';
import { Store } from '@ngxs/store';
import { DeleteUser } from '../state/admin.actions';

@Injectable({
  providedIn: 'root'
})
export class DeleteAdminCommand {
  constructor(private commandProviderService: CommandProviderService,
    private accountService: AccountService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private store: Store) {}

  execute(): void {
    const selectedRowsData = this.commandProviderService.getSelectedRowsData() as IBrowserUserModel[];
    const currentUser = this.accountService.getCurrentUser();
    console.warn(selectedRowsData, 'DeleteAdminCommand selectedRowData delete')

    selectedRowsData.forEach(user => {
      if (user.login === currentUser.userName) {
        this.dialogService.openErrorDialog(this.translateService.instant('ERROR'), this.translateService.instant('ADMIN_DETAILS.DELETE_ERROR_MESSAGE'));
      }

      this.store.dispatch(new DeleteUser(user.id));
    });

  }
}
