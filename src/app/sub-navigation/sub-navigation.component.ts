import { Component, Input } from '@angular/core';
import { ISubNavigationOptions } from './sub-nav.model';
import { CommandType } from '../shared/enums/command-type.enum';

@Component({
  selector: 'app-sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.css']
})
export class SubNavigationComponent{
  @Input()
  public naviOptions: Array<ISubNavigationOptions>

  @Input()
  public rowsCount: number;

  public commandType = CommandType;
}
