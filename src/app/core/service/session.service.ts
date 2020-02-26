import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from '../../class/account';
import * as fromCore from '../../core/store/reducers';
import { LoadSessions, LoginSessions, LogoutSessions } from '../store/actions/session.actions';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private store: Store<fromCore.State>,
              private afAuth: AngularFireAuth,) { }

  // ログイン状況確認
  checkLogin(): void {
    this.store.dispatch(new LoadSessions());
  }

  // ログイン状況確認(State)
  checkLoginState(): Observable<{ login: boolean }> {
    return this.afAuth
      .authState
      .pipe(
        map((auth: any) => {
          // ログイン状態を返り値の有無で判断
          return { login: !!auth };
        })
      )

  }

  // ログイン
  login(account: Account): void {
    this.store.dispatch(new LoginSessions({email: account.email, password: account.password}))
  }

  // ログアウト
  logout(): void {
    this.store.dispatch(new LogoutSessions);
  }
}
