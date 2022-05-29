import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  animationFrames,
  fromEvent,
  map,
  merge,
  mergeWith,
  Observable,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Song } from '../models/song';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() song: Song;
  @Output() onExit = new EventEmitter<void>();

  @ViewChild('progressInput') progressInput: ElementRef<HTMLInputElement>;

  progress$: Observable<string>;
  audio: HTMLAudioElement;

  constructor() {}

  onInputProgress({ target }: MouseEvent) {
    (<HTMLInputElement>target!).style.backgroundImage = this.countPercentage(
      +(<HTMLInputElement>target).value
    );
  }

  ngOnInit(): void {
    this.audio = new Audio(this.transform(this.song));
    this.audio.volume = 0.5;

    this.progress$ = merge(
      fromEvent(this.audio, 'play'),
      fromEvent(this.audio, 'seeked')
    ).pipe(
      switchMap((_, ind) => {
        console.log('stream starts', ind);
        return animationFrames().pipe(
          map((_) => this.countPercentage(this.audio.currentTime)),
          takeUntil(
            merge(
              fromEvent(this.audio, 'pause'),
              fromEvent(this.progressInput.nativeElement, 'input')
            )
          )
        );
      })
    );
  }
  private transform({ name, extension }: Song): string {
    return `songs/${name}.${extension}`;
  }
  private countPercentage(currentTime: number) {
    const percentage = (currentTime / this.audio.duration) * 100;
    return `linear-gradient(to right, red ${percentage}%, purple ${percentage}% 100%)`;
  }
}
