import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromCore from '../../core/store/reducers';
import { LoadSessions, } from '../store/actions/session.actions';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private store: Store<fromCore.State>,) { }

  // ログイン状況確認
  checkLogin(): void {
    this.store.dispatch(new LoadSessions());
  }
}
