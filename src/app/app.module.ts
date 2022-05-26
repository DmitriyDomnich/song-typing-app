import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerModule } from './player/player.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchModule } from './search/search.module';
import { KeyboardModule } from './keyboard/keyboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PlayerModule,
    SearchModule,
    KeyboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
