import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { LawAIState } from '../law-ai/state/law-ai.state';
import { GetChats } from '../law-ai/state/law-ai.actions';
import { MatDialog } from '@angular/material/dialog';
import { InfoPopupMessageComponent } from '../shared/messages/info-popup-message/info-popup-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-chat-cards',
  standalone: true,
  imports: [CommonModule, TranslateModule, SharedModule],
  templateUrl: './chat-cards.component.html',
  styleUrl: './chat-cards.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChatCardsComponent implements OnInit {
  chats$ = this.store.select(LawAIState.chats);

  constructor(private store: Store, private dialog: MatDialog) {
    this.store.dispatch(new GetChats());
  }

  ngOnInit(): void {
    this.dialog.open(InfoPopupMessageComponent, {
      width: '30%',
      height: 'fit-content',
      disableClose: true,
      data: {
        messageKey: 'CHAT_CARDS_INFO_MESSAGE',
        titleKey: 'CHAT_CARDS_INFO_TITLE'
      }
    });
  }
}
