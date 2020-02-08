import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ReserveActions, ReserveActionTypes } from './reserve.actions';
import { Reserve } from '../../class/reserve';

export interface State extends EntityState<Reserve> {
  loading: boolean;
}

export const adapter: EntityAdapter<Reserve> = createEntityAdapter<Reserve>();

export const initialState: State = adapter.getInitialState({
  loading: false,
});

export function reducer(
  state = initialState,
  action: ReserveActions
): State {
  switch (action.type) {

    // 予約データ読み込み時のアクション
    case ReserveActionTypes.LoadReserves: {
      console.debug('予約データ読み込み時のアクション(LoadReserves)実行');
      return { ...state, loading: true };
    }

    // 予約データ読み込み成功時のアクション
    case ReserveActionTypes.LoadReservesSuccess: {
      console.debug('予約データ読み込み成功時のアクション(LoadReservesSuccess)実行');
      return { ...adapter.addAll(action.payload.reserves, state), loading: false };
    }

    // 予約データ読み込み失敗時のアクション
    case ReserveActionTypes.LoadReservesFail: {
      console.debug('予約データ読み込み失敗時のアクション(LoadReservesFail)実行');
      return { ...state, loading: false };
    }

    default: {
      return state;
    }
  }
}

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
export const selectReserve = createFeatureSelector<State>('reserve');
export const getReserveLoading = createSelector(selectReserve, state => state.loading);
export const selectAllReserves = createSelector(selectReserve, selectAll);
