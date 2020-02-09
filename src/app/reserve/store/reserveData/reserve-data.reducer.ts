import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ReserveDataActions, ReserveDataActionTypes } from './reserve-data.actions';
import { ReserveData } from '../../../class/reserve-data';

export interface State extends EntityState<ReserveData> {
  loading: boolean;
}

export const adapter: EntityAdapter<ReserveData> = createEntityAdapter<ReserveData>();

export const initialState: State = adapter.getInitialState({
  loading: false,
});

export function reducer(
  state = initialState,
  action: ReserveDataActions
): State {
  switch (action.type) {

    // reserveDatas読み込み時のアクション
    case ReserveDataActionTypes.LoadReserveDatas: {
      console.debug('reserveDatas読み込み時のアクション(LoadReserveDatas)実行');
      return { ...state, loading: true };
    }

    // reserveDatas読み込み成功時のアクション
    case ReserveDataActionTypes.LoadReserveDatasSuccess: {
      console.debug('reserveDatas読み込み成功時のアクション(LoadReserveDatasSuccess)実行');
      return { ...adapter.addAll(action.payload.reserveDatas, state), loading: false };
    }

    // reservesDatas読み込み失敗時のアクション
    case ReserveDataActionTypes.LoadReserveDatasFail: {
      console.debug('reserveDatas読み込み失敗時のアクション(LoadReserveDatasFail)実行');
      return { ...state, loading: false };
    }

    default: {
      return state;
    }
  }
}

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
export const selectReserveData = createFeatureSelector<State>('reserveData');
export const getReserveDataLoading = createSelector(selectReserveData, state => state.loading);
export const selectAllReserveDatas = createSelector(selectReserveData, selectAll);
