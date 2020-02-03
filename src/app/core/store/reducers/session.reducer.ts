import { Session } from '../../../class/session';
import { SessionActions, SessionActionTypes } from '../actions/session.actions';


export const sessionFeatureKey = 'session';

export interface State {
  loading: boolean;
  session: Session;
}

export const initialState: State = {
  //初期化処理
  loading: false,
  session: new Session(),
};

export function reducer(
  state = initialState,
  action: SessionActions
): State {
  switch (action.type) {

    // 読み込み時のアクション
    case SessionActionTypes.LoadSessions: {
      return { ...state, loading: true };
    }

    // 読み込み成功時のアクション
    case SessionActionTypes.LoadSessionsSuccess: {
      return { ...state, loading: false, session: action.payload.session };
    }

    // 読み込み失敗時のアクション
    case SessionActionTypes.LoadSessionsFail: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}


// 取得用メソッド
export const getSessionLoading = (state: State) => state.loading;
export const getSessionData = (state: State) => state.session;
