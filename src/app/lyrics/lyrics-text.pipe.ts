import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lyricsText',
})
export class LyricsTextPipe implements PipeTransform {
  transform(lyrics: string): string {
    return lyrics.replaceAll('\r', '\n');
  }
}
