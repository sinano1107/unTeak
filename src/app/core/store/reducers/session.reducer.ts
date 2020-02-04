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
      console.debug('読み込み時のアクション(LoadSessions)実行');
      return { ...state, loading: true };
    }

    // 読み込み成功時のアクション
    case SessionActionTypes.LoadSessionsSuccess: {
      console.debug('読み込み成功時のアクション(LoadSessionsSuccess)実行');
      return { ...state, loading: false, session: action.payload.session };
    }

    // 読み込み失敗時のアクション
    case SessionActionTypes.LoadSessionsFail: {
      console.debug('読み込み失敗時のアクション(LoadSessionsFail)実行');
      return { ...state, loading: false };
    }

    // ログイン時のアクション
    case SessionActionTypes.LoginSessions: {
      console.debug('ログイン時のアクション(LoginSessions)実行');
      return { ...state, loading: true };
    }

    // ログイン成功時のアクション
    case SessionActionTypes.LoginSessionsSuccess: {
      console.debug('ログイン成功時のアクション(LoginSessionsSuccess)実行');
      return { ...state, loading: false, session: action.payload.session }
    }

    // ログイン失敗時のアクション
    case SessionActionTypes.LoginSessionsFail: {
      console.debug('ログイン失敗時のアクション(LoginSessionsFail)実行');
      return { ...state, loading: false }
    }

    default:
      return state;
  }
}


// 取得用メソッド
export const getSessionLoading = (state: State) => state.loading;
export const getSessionData = (state: State) => state.session;
