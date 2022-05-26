import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongNamePipe } from './song-name.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SongNamePipe],
  exports: [FormsModule, SongNamePipe],
})
export class SharedModule {}
