import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../models/song';

@Component({
  selector: 'lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss'],
})
export class LyricsComponent implements OnInit {
  @Input() song: Song;

  constructor() {}

  ngOnInit(): void {}
}
