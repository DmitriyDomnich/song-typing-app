import { InjectionToken } from '@angular/core';

export interface JsMediaTags {
  Reader: any;
}
export interface MediaTags {
  tags: {
    lyrics: string | { lyrics: string };
    picture: {
      format: string;
      data: any;
    };
  };
}

export const JS_MEDIA_TAGS = new InjectionToken<JsMediaTags>('');
