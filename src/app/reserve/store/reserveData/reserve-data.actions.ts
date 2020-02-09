import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ReserveData } from '../../../class/reserve-data';

export enum ReserveDataActionTypes {
  LoadReserveDatas = '[ReserveData] Load ReserveDatas',
  LoadReserveDatasSuccess = '[ReserveData] Load ReserveDatas Success',
  LoadReserveDatasFail = '[ReserveData] Load ReserveDatas Fail',
}

// reserveDatas読み込み時のアクション
export class LoadReserveDatas implements Action {
  readonly type = ReserveDataActionTypes.LoadReserveDatas;

  constructor(public payload: { reserveDatas: ReserveData[] }) {}
}

// reserveDatas読み込み成功時のアクション
export class LoadReserveDatasSuccess implements Action {
  readonly type = ReserveDataActionTypes.LoadReserveDatasSuccess;

  constructor(public payload: { reserveDatas: ReserveData[] }) {}
}

// reserveDatas読み込み失敗時のアクション
export class LoadReserveDatasFail implements Action {
  readonly type = ReserveDataActionTypes.LoadReserveDatasFail;

  constructor(public payload?: { error: any }) {}
}

export type ReserveDataActions =
  LoadReserveDatas
  | LoadReserveDatasSuccess
  | LoadReserveDatasFail;
