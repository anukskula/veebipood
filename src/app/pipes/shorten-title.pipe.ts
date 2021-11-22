import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {

  transform(title: string, wordCount?: number): string {
    if (!wordCount) {
      wordCount = 3;
    }
    return title.split(" ").slice(0, wordCount).join(" ");
  }

}
