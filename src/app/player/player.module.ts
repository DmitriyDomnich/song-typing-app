import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { BackgroundImagePipe } from './background-image.pipe';
import { SharedModule } from '../shared/shared.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [PlayerComponent, BackgroundImagePipe],
  imports: [CommonModule, SharedModule, ButtonsModule],
  exports: [PlayerComponent],
})
export class PlayerModule {}
