import { InjectionToken } from '@angular/core';

export interface JsMediaTags {
  Reader: any;
}
export interface MediaTags {
  tags: {
    picture: {
      data: any;
      format: string;
    };
  };
}

export const JS_MEDIA_TAGS = new InjectionToken<JsMediaTags>('');
