import { Component, Input } from '@angular/core';
import { ISubNavigationOptions } from './sub-nav.model';

@Component({
  selector: 'app-sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.css']
})
export class SubNavigationComponent {
  @Input() naviOptions: Array<ISubNavigationOptions>
}
