import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Image } from '../../class/image';
import { Store } from '@ngrx/store';
import * as fromImage from '../store/image.reducer';
import { AddImage } from '../store/image.actions';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public imageIds: Observable<string[] | number[]>;

  constructor(private image: Store<fromImage.State>) {
    this.imageIds = this.image.select(fromImage.selectImageIds);
  }

  // 画像データ追加関数
  addImage(i: Image): void {
    this.image.dispatch(new AddImage({
      image: i
    }));
  }

  // 検索関数
  searchImage(id: string): Observable<boolean> {
    return this.imageIds.pipe(
      switchMap(imageIds => {
        for(let i=0; i<imageIds.length; i++) {
          if (String(imageIds[i]) == id) {
            return of(true);
          }
        }
        return of(false);
      })
    )
  }
}
