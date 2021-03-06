import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quotes'
})
export class QuotesPipe implements PipeTransform {

  transform(word: string): string {
    if (!word) {
      return '';
    }
      const wordClean = word.replace(/"/g, '');
  return wordClean;
  }
}
