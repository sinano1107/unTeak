import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import {
  SessionActionTypes,
  LoadSessions,
  LoadSessionsSuccess,
  LoadSessionsFail,
  LoginSessions,
  LoginSessionsSuccess,
  LoginSessionsFail,
  LogoutSessions,
  LogoutSessionsSuccess,
  LogoutSessionsFail,
} from '../actions/session.actions';
import { Session } from '../../../class/session';
import { User } from '../../../class/user';
import { User as fbUser } from 'firebase';


@Injectable()
export class SessionEffects {

  constructor(private actions$: Actions,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {}

  // 読み込み時の処理
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
                return result;
              }
            }),
            catchError(this.handleLoginError<LoadSessionsFail>(
              'fetchAuth', new LoadSessionsFail()
            ))
          )
      }),
      // ユーザーの認証化情報を取得
      switchMap((auth: fbUser | LoadSessionsSuccess | LoadSessionsFail) => {
        // ユーザーが存在しなかった場合は、認証化情報を取得しない
        if (auth instanceof LoadSessionsSuccess || auth instanceof LoadSessionsFail) {
          return of(auth);
        }
        // ユーザーが存在した場合
        return this.afs
          .collection('users')
          .doc(auth.uid)
          .valueChanges()
          .pipe(
            take(1),
            map((result: User) => {
              return new LoadSessionsSuccess({
                session: new Session(
                  new User(auth.uid, result.name, result.icon, result.back)
                )
              })
            }),
            catchError(this.handleLoginError<LoadSessionsFail>(
              'fetchUser', new LoadSessionsFail()
            ))
          )
      })
    );

  // ログイン時の処理
  @Effect()
  loginSession$: Observable<Action> =
    this.actions$.pipe(
      ofType<LoginSessions>(SessionActionTypes.LoginSessions),
      map(action => action.payload),
      switchMap((payload: { email: string, password: string }) => {
        return this.afAuth
          .auth
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(auth => {
            // ユーザーが存在しなかった場合は、空のセッションを返す
            if (!auth.user.emailVerified) {
              auth.user.sendEmailVerification()
              alert('メールアドレスが確認できていません。\n確認用メールを再送しました！');
              this.afAuth.auth.signOut()
              return new LoginSessionsSuccess({ session: new Session() });
            } else {
              return auth.user;
            }
          })
          .catch(err => {
            alert('ログインに失敗しました。\n' + err);
            return new LoginSessionsFail({ error: err });
          });
      }),
      switchMap((auth: fbUser | LoginSessionsSuccess | LoginSessionsFail) => {
        // ユーザーが存在しなかった場合は、空のセッションを返す
        if (auth instanceof LoginSessionsSuccess || auth instanceof LoginSessionsFail) {
          return of(auth);
        }
        return this.afs
          .collection('users')
          .doc(auth.uid)
          .valueChanges()
          .pipe(
            take(1),
            map((result: User) => {
              this.router.navigate(['/']);
              return new LoginSessionsSuccess({
                session: new Session(
                  new User(auth.uid, result.name, result.icon, result.back)
                )
              })
            })
          )
      })
    )

  // ログアウト時の処理
  @Effect()
  logoutSessions$: Observable<Action> =
  this.actions$.pipe(
    ofType<LogoutSessions>(SessionActionTypes.LogoutSessions),
    switchMap(() => {
      return this.afAuth.auth.signOut()
        .then(() => {
          alert('ログアウトしました');
          return new LogoutSessionsSuccess({
            session: new Session()
          });
        });
    }),
    catchError(this.handleLoginError<LogoutSessionsFail>(
      'logoutUser', new LogoutSessionsFail(), 'logout'
    ))
  )

  // エラー発生時の処理
  private handleLoginError<T> (operation = 'operation', result: T, dialog?: 'login' | 'logout') {
    return (error: any): Observable<T> => {

      // 失敗した操作の名前、エラーログをconsoleに出力
      console.error(`${operation} failed: ${error.message}`);

      // アラートダイアログの表示
      if (dialog == 'login') {
        alert('ログインに失敗しました。\n' + error);
      }

      if (dialog == 'logout') {
        alert('ログアウトに失敗しました。\n' + error);
      }

      // ログアウト処理
      this.afAuth.auth.signOut()

      // 結果を返して、アプリを持続可能にする
      return of(result as T);
    }
  }

}
