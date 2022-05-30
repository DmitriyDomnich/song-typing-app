import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  animationFrames,
  first,
  fromEvent,
  map,
  merge,
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
export class PlayerComponent implements OnInit, OnDestroy {
  @Input() song: Song;
  @Output() onExit = new EventEmitter<void>();

  @ViewChild('progressInput') progressInput: ElementRef<HTMLInputElement>;

  progress$: Observable<string>;
  audioDuration$: Observable<number>;
  audio: HTMLAudioElement;

  constructor() {}

  onInputProgress({ target }: MouseEvent) {
    const percentage = this.countPercentage(+(<HTMLInputElement>target).value);
    console.log(
      <HTMLDivElement>(<HTMLDivElement>target).previousElementSibling!
    );
    (<HTMLDivElement>(
      (<HTMLDivElement>target).previousElementSibling!
    )).style.left = percentage + '%';
    (<HTMLInputElement>target!).style.backgroundImage =
      this.getBackgroundImageProgress(percentage);
  }

  ngOnInit(): void {
    this.audio = new Audio(this.transform(this.song));
    this.audio.preload = 'metadata';
    this.audio.volume = 0.5;

    this.audioDuration$ = fromEvent(this.audio, 'loadedmetadata').pipe(
      first(),
      map((_) => this.audio.duration)
    );

    this.progress$ = merge(
      fromEvent(this.audio, 'play'),
      fromEvent(this.audio, 'seeked')
    ).pipe(
      switchMap((_, ind) => {
        console.log('stream starts', ind);
        return animationFrames().pipe(
          map((_) =>
            this.getBackgroundImageProgress(
              this.countPercentage(this.audio.currentTime)
            )
          ),
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
  ngOnDestroy(): void {
    this.audio.pause();
  }
  private transform({ name, extension }: Song): string {
    return `songs/${name}.${extension}`;
  }
  private getBackgroundImageProgress(percentage: number) {
    return `linear-gradient(to right, var(--bs-pink) ${percentage}%, var(--bs-dark) ${percentage}% 100%)`;
  }
  private countPercentage(currentTime: number) {
    return (currentTime / this.audio.duration) * 100;
  }
}
