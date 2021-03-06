import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ReserveData } from '../../../class/reserve-data';

export enum ReserveDataActionTypes {
  LoadReserveDatas = '[ReserveData] Load ReserveDatas',
  LoadReserveDatasSuccess = '[ReserveData] Load ReserveDatas Success',
  LoadReserveDatasFail = '[ReserveData] Load ReserveDatas Fail',
  AddReserveData = '[ReserveData] Add ReserveData',
  UpdateReserveData = '[ReserveData] Update ReserveData',
  DeleteReserveData = '[ReserveData] Delete ReserveData',
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

// reserveData編集時のアクション
export class UpdateReserveData implements Action {
  readonly type = ReserveDataActionTypes.UpdateReserveData;

  constructor(public payload: { reserveData: Update<ReserveData> }) {}
}

// reserveData削除時のアクション
export class DeleteReserveData implements Action {
  readonly type = ReserveDataActionTypes.DeleteReserveData;

  constructor(public payload: { id: string }) {}
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
  | UpdateReserveData
  | DeleteReserveData
  | WriteReserveDataSuccess
  | WriteReserveDataFail;
