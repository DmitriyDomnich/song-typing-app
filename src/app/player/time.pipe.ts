import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds - mins * 60);

    return `${this.addLeadingZero(mins)}:${this.addLeadingZero(secs)}`;
  }

  private addLeadingZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
