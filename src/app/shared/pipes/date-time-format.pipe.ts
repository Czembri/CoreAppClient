import { Pipe, PipeTransform } from '@angular/core';
import { STANDARD_DATE_TIME_FORMAT } from '../constants/date-formats';
import * as moment from 'moment';

@Pipe({
  name: 'dateTimeFormatPipe'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(date: string): string {
    return (moment(date)).format(STANDARD_DATE_TIME_FORMAT);
  }
}
