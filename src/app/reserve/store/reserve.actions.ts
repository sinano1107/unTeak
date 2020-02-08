import { Action } from '@ngrx/store';

import { Reserve } from '../../class/reserve';

export enum ReserveActionTypes {
  LoadReserves = '[Reserve] Load Reserves',
  LoadReservesSuccess = '[Reserves] Load Reserves Success',
  LoadReservesFail = '[Reserves] Load Reserves Fail',
}

// 予約データ読み込み時のアクション
export class LoadReserves implements Action {
  readonly type = ReserveActionTypes.LoadReserves;

  constructor(public payload: { reserves: Reserve[] }) {}
}

// 予約データ読み込み成功時のアクション
export class LoadReservesSuccess implements Action {
  readonly type = ReserveActionTypes.LoadReservesSuccess;

  constructor(public payload: { reserves: Reserve[] }) {}
}

// 予約データ読み込み失敗時のアクション
export class LoadReservesFail implements Action {
  readonly type = ReserveActionTypes.LoadReservesFail;

  constructor(public payload?: { error: any }) {}
}


export type ReserveActions =
  LoadReserves
  | LoadReservesSuccess
  | LoadReservesFail;
