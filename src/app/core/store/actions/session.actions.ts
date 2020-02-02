import { Action } from '@ngrx/store';
import { Session } from '../../../class/session';

export enum SessionActionTypes {
  LoadSessions = '[Session] Load Sessions',
  LoadSessionsSuccess = '[Session] Load Success',
  LoadSessionsFail = '[Session] LoadFail',
}

// 読み込み時のアクション
export class LoadSessions implements Action {
  readonly type = SessionActionTypes.LoadSessions;
}

// 読み込み成功のアクション
export class LoadSessionsSuccess implements Action {
  readonly type = SessionActionTypes.LoadSessionsSuccess;

  constructor(public payload: { session: Session }) {}
}

// 読み込み失敗時のアクション
export class LoadSessionsFail implements Action {
  readonly type = SessionActionTypes.LoadSessionsFail;

  constructor(public payload?: { error: any }) {}
}


export type SessionActions =
  | LoadSessions
  | LoadSessionsSuccess
  | LoadSessionsFail;
