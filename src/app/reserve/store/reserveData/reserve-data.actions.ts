import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ReserveData } from '../../../class/reserve-data';

export enum ReserveDataActionTypes {
  LoadReserveDatas = '[ReserveData] Load ReserveDatas',
  LoadReserveDatasSuccess = '[ReserveData] Load ReserveDatas Success',
  LoadReserveDatasFail = '[ReserveData] Load ReserveDatas Fail',
  AddReserveData = '[ReserveData] Add ReserveData',
  WriteReserveDataSuccess = '[ReserveData] Write ReserveData Success',
  WriteReserveDataFail = '[ReserveData] Write ReserveData Fail',
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

// reserveData追加時のアクション
export class AddReserveData implements Action {
  readonly type = ReserveDataActionTypes.AddReserveData;

  constructor(public payload: { reserveData: ReserveData }) {}
}

// reserveData書き換え・追加成功時のアクション
export class WriteReserveDataSuccess implements Action {
  readonly type = ReserveDataActionTypes.WriteReserveDataSuccess;

  constructor(public payload?: { reserveDatas: ReserveData[] }) {}
}

// reserveData書き換え・追加失敗時のアクション
export class WriteReserveDataFail implements Action {
  readonly type = ReserveDataActionTypes.WriteReserveDataFail;

  constructor(public payload?: { error: any }) {}
}

export type ReserveDataActions =
  LoadReserveDatas
  | LoadReserveDatasSuccess
  | LoadReserveDatasFail
  | AddReserveData
  | WriteReserveDataSuccess
  | WriteReserveDataFail;
