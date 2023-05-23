import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public LOGO = require('./assets/images/logo.png');
}
