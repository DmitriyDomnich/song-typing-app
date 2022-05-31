import {
  Component,
  HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { fromEvent, Subscription, tap } from 'rxjs';
import { Song } from '../models/song';
import { LetterDirective } from './letter.directive';

@Component({
  selector: 'lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss'],
})
export class LyricsComponent implements OnInit {
  lyrics: string[] | undefined;
  private _letters: LetterDirective[];

  @ViewChildren(LetterDirective) set letters(
    lettersQueryList: QueryList<LetterDirective>
  ) {
    this._letters = lettersQueryList.filter((letterDirective) => {
      const letter = letterDirective.getLetter();
      return !!letter && letter !== '\n';
    });
    this._letters[this.currentLetterIndex].setCursor();
  }

  @Input() set song({ lyrics }: Song) {
    this.lyrics = lyrics?.replaceAll('\r', '\n').split('');
  }

  @HostListener('window:keydown', ['$event']) onKeyDown(ev: KeyboardEvent) {
    if (ev.key === ' ') {
      ev.preventDefault();
    }
  }

  currentLetterIndex = 0;

  typing$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
    tap(({ key }) => {
      const letterDirective = this._letters[this.currentLetterIndex];
      console.log(letterDirective.getOffsetTop());
      if (key === letterDirective?.getLetter()) {
        letterDirective.styleLetter();
        letterDirective.removeCursor();
        if (++this.currentLetterIndex < this._letters.length) {
          this._letters[this.currentLetterIndex].setCursor();
        } else {
          console.log('done!');
        }
      }
    })
  );
  sub: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.sub = this.typing$.subscribe();
  }
}
