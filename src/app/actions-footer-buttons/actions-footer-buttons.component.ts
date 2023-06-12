import { Component, Input } from '@angular/core';

@Component({
  selector: 'actions-footer-buttons',
  templateUrl: './actions-footer-buttons.component.html',
  styleUrls: ['./actions-footer-buttons.component.css']
})
export class ActionsFooterButtonsComponent {

  @Input() public leftButtonName;
  @Input() public rightButtonName;
}
