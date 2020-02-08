import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

import { Reserve } from '../../class/reserve';
import { ReserveData } from '../../class/reserve-data';
import { Community } from '../../class/comunity';
import {
  ReserveActionTypes,
  LoadReserves,
  LoadReservesSuccess,
  LoadReservesFail,
} from './reserve.actions';


@Injectable()
export class ReserveEffects {



  constructor(private actions$: Actions,
              private db: AngularFirestore) {}

  // 予約データ読み込み時のアクション
  @Effect()
  loadReserves$: Observable<Action> =
    this.actions$.pipe(
      ofType<LoadReserves>(ReserveActionTypes.LoadReserves),
      map(action => action.payload.reserves),
      // communitiesを取得
      switchMap(() => {
        const communities = this.db.collection<Community>('communities').snapshotChanges();
        return communities;
      }),

      // comunityIdを取得してreservesを取得
      switchMap((communities) => {
        const communityId = communities[0].payload.doc.id;
        // reservesを取得
        const reserves = this.db.collection<Community>('communities')
          .doc(communityId)
            .collection<Reserve>('reserves', ref => {
              return ref.orderBy('date', 'asc');
            }).snapshotChanges();
        // reservesを展開してLoadReservesSuccesかFailに送る
        return reserves.pipe(
          map((reserves) => reserves.map((reserve) => {
            console.debug(reserve);
            const data = reserve.payload.doc.data();
            const id = reserve.payload.doc.id;
            return new Reserve(id, data.compulsion, data.date);
          })),
          map((result: Reserve[]) => {
            console.debug('result', result);
            return new LoadReservesSuccess({
              reserves: result
            })
          }),
          catchError(this.handleReservesError(
            'fetchReserves', new LoadReservesFail
          ))
        )
      })
    )

  // エラー発生時の処理
  private handleReservesError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {

      // 失敗した処理の名前、エラーログをコンソールに出力
      console.error(`${operation} failed: ${error.message}`);

      // 結果を返して、アプリを持続可能にする
      return of(result as T);
    }
  }

}
