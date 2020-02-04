import { Action } from '@ngrx/store';
import { Session } from '../../../class/session';

export enum SessionActionTypes {
  LoadSessions = '[Session] Load Sessions',
  LoadSessionsSuccess = '[Session] Load Success',
  LoadSessionsFail = '[Session] LoadFail',
  LoginSessions = '[Session] Login',
  LoginSessionsSuccess = '[Session] Login Success',
  LoginSessionsFail = '[Session] Login Fail',
}

// 読み込み時のアクション
export class LoadSessions implements Action {
  readonly type = SessionActionTypes.LoadSessions;
}

// 読み込み成功時のアクション
export class LoadSessionsSuccess implements Action {
  readonly type = SessionActionTypes.LoadSessionsSuccess;

  constructor(public payload: { session: Session }) {}
}

// 読み込み失敗時のアクション
export class LoadSessionsFail implements Action {
  readonly type = SessionActionTypes.LoadSessionsFail;

  constructor(public payload?: { error: any }) {}
}

// ログイン時のアクション
export class LoginSessions implements Action {
  readonly type = SessionActionTypes.LoginSessions;

  constructor(public payload: { email: string, password: string }) {}
}

// ログイン成功時のアクション
export class LoginSessionsSuccess implements Action {
  readonly type = SessionActionTypes.LoginSessionsSuccess;

  constructor(public payload: { session: Session }) {}
}

// ログイン失敗時のアクション
export class LoginSessionsFail implements Action {
  readonly type = SessionActionTypes.LoginSessionsFail;

  constructor(public payload?: { error: any }) {}
}


export type SessionActions =
  | LoadSessions
  | LoadSessionsSuccess
  | LoadSessionsFail
  | LoginSessions
  | LoginSessionsSuccess
  | LoginSessionsFail;
