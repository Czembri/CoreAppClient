import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evenOdd'
})
export class EvenOddPipe implements PipeTransform {

  transform(n: number): string {
    if(this.isEven(n)) {
      return 'even';
    }
    if(this.isOdd(n)) {
      return 'odd';
    }
  }

  private isEven(n: number) {
    return n % 2 == 0;
  }

  private isOdd(n: number) {
      return Math.abs(n % 2) == 1;
  }
}
