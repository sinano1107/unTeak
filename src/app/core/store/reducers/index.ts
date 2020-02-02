import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as fromSession from './session.reducer';


export interface State {

  [fromSession.sessionFeatureKey]: fromSession.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromSession.sessionFeatureKey]: fromSession.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];


export function logger(reducer: ActionReducer<State>) {
  return (state, action) => {
    const newState = reducer(state, action);
    console.log('action', action);
    console.log('state', newState);
    return newState;
  };
}
