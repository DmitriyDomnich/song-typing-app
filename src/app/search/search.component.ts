import { Component, Inject, OnInit } from '@angular/core';
import {
  from,
  fromEvent,
  map,
  mergeMap,
  Observable,
  switchMap,
  tap,
  toArray,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Song } from '../models/song';
import { JS_MEDIA_TAGS, JsMediaTags, MediaTags } from './jsmediatags-token';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  selectedTrack = '';
  songs$: Observable<Song[]>;
  test: any;
  Reader: any;

  songSelected(smth: any) {
    console.log(smth);
  }

  constructor(@Inject(JS_MEDIA_TAGS) reader: JsMediaTags) {
    this.Reader = reader;
  }

  ngOnInit(): void {
    let i = 0;
    this.test = ajax<Song[]>('./songs.json').pipe(
      mergeMap(({ response }) => response),
      mergeMap((song) =>
        ajax<Blob>({
          url: `songs/${song.name}.m4a`,
          responseType: 'blob',
        }).pipe(
          mergeMap(({ response }, ind) => {
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
              switchMap((imgData) => {
                const fileReader = new FileReader();
                console.log('before', imgData);
                fileReader.readAsDataURL(new Blob(imgData.tags.picture.data));

                return fromEvent(fileReader, 'loadend').pipe(
                  map((val) => (console.log('done'), { ...song }))
                );
              })
            );
          })
        )
      )
    );
  }
}
