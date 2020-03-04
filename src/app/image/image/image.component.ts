import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

import { Image } from '../../class/image';
import { Store } from '@ngrx/store';
import * as fromImage from '../store/image.reducer';
import { ImageService } from '../service/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit, OnDestroy {

  @Input() imageId: string;
  @Input() classItem: string;

  images: Observable<{}>;
  public url: string;
  isLoading = true;

  subsc = new Subscription();

  constructor(private image: ImageService,
              private imageStore: Store<fromImage.State>,
              private storage: AngularFireStorage) {
    this.images = this.imageStore.select(fromImage.selectImageEntities);
  }

  ngOnInit(): void {
    this.subsc.add(this.image.searchImage(this.imageId)
      .subscribe(result => {
        if (result) {
          this.subsc.add(this.images
            .subscribe((images) => {
              this.url = images[this.imageId]['url'];
              this.isLoading = false;
          }));
        } else {
          // addする
          this.subsc.add(this.storage.ref(this.imageId)
            .getDownloadURL().subscribe(
              url => {
                this.image.addImage(new Image(this.imageId, url));
                this.isLoading = false;
          }));
        }
    }));
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }
}
