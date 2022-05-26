import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../models/song';

@Pipe({
  name: 'songName',
})
export class SongNamePipe implements PipeTransform {
  transform(song: Song[]): string[] {
    const val = song.map((song) => song.name);
    console.log(val);
    return val;
  }
}
