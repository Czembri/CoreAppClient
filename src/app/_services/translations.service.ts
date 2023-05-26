import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  constructor(private translate: TranslateService) { }

  enumTranslation(enumValue: string | string[]) {
    return this.translate.instant(enumValue);
  }
}
