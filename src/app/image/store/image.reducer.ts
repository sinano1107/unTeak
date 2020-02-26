import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Image } from '../../class/image';
import { ImageActions, ImageActionTypes } from './image.actions';

export const imagesFeatureKey = 'images';

export interface State extends EntityState<Image> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Image> = createEntityAdapter<Image>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: ImageActions
): State {
  switch (action.type) {

    // 画像データ保存時のアクション
    case ImageActionTypes.AddImage: {
      console.debug('画像データ保存時のアクション(AddImage)実行');
      return adapter.addOne(action.payload.image, state);
    }

    default: {
      return state;
    }
  }
}

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
export const selectImage = createFeatureSelector<State>('images');
export const selectImageEntities = createSelector(selectImage, selectEntities);
export const selectImageIds = createSelector(selectImage, selectIds);
