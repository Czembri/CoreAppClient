import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'actions-footer-buttons',
  templateUrl: './actions-footer-buttons.component.html',
  styleUrls: ['./actions-footer-buttons.component.css']
})
export class ActionsFooterButtonsComponent {

  @Input() public leftButtonName: string;
  @Input() public rightButtonName: string;

  @Output() public leftButtonClicked = new EventEmitter();
  @Output() public rightButtonClicked = new EventEmitter();

  public onLeftButtonClick(): void {
    this.leftButtonClicked.emit();
  }

  public onRightButtonClick(): void {
    this.rightButtonClicked.emit();
  }
}
