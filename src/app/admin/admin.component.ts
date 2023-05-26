import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  constructor() {}
}
