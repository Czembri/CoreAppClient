import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { InfoDialogModel } from '../models/info.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-info-popup-message',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatDialogModule,
    MatButtonModule, DragDropModule],
  templateUrl: './info-popup-message.component.html',
  styleUrl: './info-popup-message.component.css'
})
export class InfoPopupMessageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InfoDialogModel) {}
}
