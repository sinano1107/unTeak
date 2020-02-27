import { InjectionToken } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action,
  combineReducers
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as fromSession from './session.reducer';


export interface State {
  [fromSession.sessionFeatureKey]: fromSession.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromSession.sessionFeatureKey]: fromSession.reducer,
};
export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<State>>('App Reducers');
export const reducerProvider = { provide: REDUCERS_TOKEN, useValue: reducers };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];


export function logger(reducer: ActionReducer<State>) {
  return (state, action) => {
    const newState = reducer(state, action);
    console.log('action', action);
    console.log('state', newState);
    return newState;
  };
}

// 取得用セレクタ
export const selectSession = (state: State) => state.session;
export const getLoading = createSelector(selectSession, fromSession.getSessionLoading);
export const getSession = createSelector(selectSession, fromSession.getSessionData);
