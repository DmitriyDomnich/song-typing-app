import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'songProgress',
})
export class SongProgressPipe implements PipeTransform {
  transform(percentage: number): string {
    return `linear-gradient(to right, red ${percentage}%, var(--bs-dark) ${percentage}% 100%)`;
  }
}
