import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Community } from '../../../class/community';
import { Reserve } from '../../../class/reserve';
import { ReserveData } from '../../../class/reserve-data';
import {
  ReserveDataActionTypes,
  LoadReserveDatas,
  LoadReserveDatasSuccess,
  LoadReserveDatasFail,
  AddReserveData,
  WriteReserveDataSuccess,
  WriteReserveDataFail,
} from './reserve-data.actions';


@Injectable()
export class ReserveDataEffects {

  constructor(private actions$: Actions,
              private db: AngularFirestore) {}

  // reserveDatas読み込み時のエフェクト
  @Effect()
  LoadReserveData$: Observable<Action> =
    this.actions$.pipe(
      ofType<LoadReserveDatas>(ReserveDataActionTypes.LoadReserveDatas),
      map(action => action.payload.reserveDatas),
      switchMap(() => {

        return this.db.collection<Community>('communities', ref => {
          return ref.where("name", "==", "N中新宿キャンパス");
        }).snapshotChanges()
      }),

      switchMap((communities) => {
        const communityId = communities[0].payload.doc.id;
        const reserveDatas = this.db.collection<Community>('communities')
          .doc(communityId)
            .collection<ReserveData>('reserveDatas').snapshotChanges()
        return reserveDatas.pipe(
          map((reserveDatas) => reserveDatas.map((reserveData) => {
            console.debug('reserveData',reserveData);
            const data = reserveData.payload.doc.data();
            const id = reserveData.payload.doc.id;
            return new ReserveData(data.reserveId, data.uid, data.campusId, id);
          })),
          map((result: ReserveData[]) => {
            console.debug('result', result);
            return new LoadReserveDatasSuccess({
              reserveDatas: result
            })
          }),
          catchError(this.handleReservesError(
            'fetchReserveDatas', new LoadReserveDatasFail
          ))
        )
      })
    )

  // reserveData追加時のエフェクト
  @Effect()
  AddReserveData$: Observable<Action> =
    this.actions$.pipe(
      ofType<AddReserveData>(ReserveDataActionTypes.AddReserveData),
      map(action => action.payload.reserveData),
      switchMap((reserveData: ReserveData) => {
        console.debug('reserveData', reserveData);
        return this.db.collection('communities')
          .doc('g3Xnp6T1S9xwsDhZLyYZ')
          .collection('reserveDatas')
          .add(reserveData.deserialize())
          .then(() => new WriteReserveDataSuccess())
          .catch(() => new WriteReserveDataFail({ error: 'failed.to add' }));
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
