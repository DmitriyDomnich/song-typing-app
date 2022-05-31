import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LyricsComponent } from './lyrics.component';
import { LyricsTextPipe } from './lyrics-text.pipe';
import { LetterDirective } from './letter.directive';

@NgModule({
  declarations: [LyricsComponent, LyricsTextPipe, LetterDirective],
  imports: [CommonModule],
  exports: [LyricsComponent],
})
export class LyricsModule {}
