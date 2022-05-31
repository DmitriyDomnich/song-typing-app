import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { BackgroundImagePipe } from './background-image.pipe';
import { SharedModule } from '../shared/shared.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimePipe } from './time.pipe';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [PlayerComponent, BackgroundImagePipe, TimePipe],
  imports: [CommonModule, SharedModule, ButtonsModule, BsDropdownModule],
  exports: [PlayerComponent],
})
export class PlayerModule {}
