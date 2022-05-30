import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { BackgroundImagePipe } from './background-image.pipe';
import { SharedModule } from '../shared/shared.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { SongProgressPipe } from './song-progress.pipe';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [PlayerComponent, BackgroundImagePipe, SongProgressPipe, TimePipe],
  imports: [CommonModule, SharedModule, ButtonsModule],
  exports: [PlayerComponent],
})
export class PlayerModule {}
