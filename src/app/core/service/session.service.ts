import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Account } from '../../class/account';
import * as fromCore from '../../core/store/reducers';
import { LoadSessions, LoginSessions, } from '../store/actions/session.actions';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private store: Store<fromCore.State>,) { }

  // ログイン状況確認
  checkLogin(): void {
    console.debug('checkLogin実行--from(sessionService)');
    this.store.dispatch(new LoadSessions());
  }

  // ログイン
  login(account: Account): void {
    this.store.dispatch(new LoginSessions({email: account.email, password: account.password}))
  }
}
