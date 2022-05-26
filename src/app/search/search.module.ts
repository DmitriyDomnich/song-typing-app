import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { JS_MEDIA_TAGS } from './jsmediatags-token';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, TypeaheadModule, SharedModule],
  exports: [SearchComponent],
  providers: [{ provide: JS_MEDIA_TAGS, useValue: jsmediatags.Reader }],
})
export class SearchModule {}
