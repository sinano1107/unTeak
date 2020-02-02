import { Action } from '@ngrx/store';

export enum SessionActionTypes {
  LoadSessions = '[Session] Load Sessions',
  
  
}

export class LoadSessions implements Action {
  readonly type = SessionActionTypes.LoadSessions;
}


export type SessionActions = LoadSessions;
