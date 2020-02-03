import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import {
  SessionActionTypes,
  LoadSessions,
  LoadSessionsSuccess,
  LoadSessionsFail,
} from '../actions/session.actions';
import { Session } from '../../../class/session';
import { User } from '../../../class/user';
import { User as fbUser } from 'firebase';


@Injectable()
export class SessionEffects {

  constructor(private actions$: Actions,
              private afAuth: AngularFireAuth,) {}

  @Effect()
  LoadSession$: Observable<Action> =
    this.actions$.pipe(
      ofType<LoadSessions>(SessionActionTypes.LoadSessions),
      // ユーザーの認証状況を取得
      switchMap(() => {
        return this.afAuth.authState
          .pipe(
            take(1),
            map((result: fbUser | null) => {
              if (!result) {
                // ユーザーが存在しなかった場合は、空のセッションを返す
                return new LoadSessionsSuccess({ session: new Session() });
              } else {
                return new LoadSessionsSuccess({ session: new Session(
                                                new User(result.uid, result.displayName))});
              }
            }),
            catchError(this.handleLoginError<LoadSessionsFail>(
              'fetchAuth', new LoadSessionsFail()
            ))
          )
      })
    );

  // エラー発生時の処理
  private handleLoginError<T> (operation = 'operation', result: T) {
    return (error: any): Observable<T> => {

      // 失敗した操作の名前、エラーログをconsoleに出力
      console.error(`${operation} failed: ${error.message}`);

      // ログアウト処理
      this.afAuth.auth.signOut()

      // 結果を返して、アプリを持続可能にする
      return of(result as T);
    }
  }

}
