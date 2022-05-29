import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { from, map, mergeMap, Observable, take, tap, toArray } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Song } from '../models/song';
import { JS_MEDIA_TAGS, JsMediaTags, MediaTags } from './jsmediatags-token';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() onSongSelected = new EventEmitter<Song>();

  selectedTrack = '';
  songs$: Observable<Song[]>;
  test: any;
  Reader: any;

  constructor(@Inject(JS_MEDIA_TAGS) reader: JsMediaTags) {
    this.Reader = reader;
  }

  ngOnInit(): void {
    let i = 0;
    this.songs$ = ajax<Song[]>('./songs.json').pipe(
      mergeMap(({ response }) => response),
      mergeMap((song) =>
        ajax<Blob>({
          url: `songs/${song.name}.${song.extension}`,
          responseType: 'blob',
        }).pipe(
          mergeMap(({ response }) => {
            console.log('got song #' + i++);
            const reader = new this.Reader(response);
            reader.setTagsToRead(['picture']);

            return from(
              new Promise<MediaTags>((res, rej) => {
                reader.read({
                  onSuccess(data: any) {
                    res(data);
                  },
                  onError(err: any) {
                    rej(err);
                  },
                });
              })
            ).pipe(
              map((imgData) => {
                const base64 = btoa(
                  (<Array<any>>imgData.tags.picture.data).reduce(
                    (acc, curr) => acc + String.fromCharCode(curr),
                    ''
                  )
                );
                return {
                  ...song,
                  cover: `data:${imgData.tags.picture.format};base64,${base64}`,
                };
              }),
              take(1)
            );
          })
        )
      ),
      toArray(),
      tap((val) => console.log(val))
    );
  }
}
