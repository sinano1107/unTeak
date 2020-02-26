import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image/image.component';
import { StoreModule } from '@ngrx/store';
import * as fromImage from './store/image.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ImageEffects } from './store/image.effects';

@NgModule({
  declarations: [ImageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromImage.imagesFeatureKey, fromImage.reducer),
    EffectsModule.forFeature([ImageEffects])
  ],
  exports: [ImageComponent],
})
export class ImageModule { }
