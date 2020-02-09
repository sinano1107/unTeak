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
} from './reserve-data.actions';


@Injectable()
export class ReserveDataEffects {

  constructor(private actions$: Actions,
              private db: AngularFirestore) {}

  // reserveDatas読み込み時のエフェクト
  @Effect()
  LoadReserveDatas$: Observable<Action> =
    this.actions$.pipe(
      ofType<LoadReserveDatas>(ReserveDataActionTypes.LoadReserveDatas),
      map(action => action.payload.reserveDatas),
      switchMap(() => {

        return this.db.collection<Community>('communities', ref => {
          return ref.where("name", "==", "N中新宿キャンパス");
        }).snapshotChanges()



        // コミュニティIDを取得
        /*const communityId = this.db.collection<Community>('communities', ref => {
          return ref.where("name", "==", "N中新宿キャンパス");
        }).snapshotChanges().subscribe((communities) => {
          return communities[0].payload.doc.id;
        })
        return of({reservesId, communityId});*/
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
            return new ReserveData(id, data.reserveId, data.uid, data.campusId);
          })),
          map((result: ReserveData[]) => {
            console.debug('result', result);
            return new LoadReserveDatasSuccess({
              reserveDatas: result
            })
          })
        )
      })

      /*switchMap((ids) => {
        console.debug('ids', ids);
        // reservesDataを取得
        const reserveDatas = this.db.collection<Community>('communities')
          .doc(ids.communityId)
            .collection<Reserve>('reserves')
              .doc(ids.reservesId)
                .collection<ReserveData>('data').snapshotChanges()
        return reserveDatas.pipe(
          map((reserveDatas) => reserveDatas.map((reserveData) => {
            console.debug('reserveData', reserveData);
            const data = reserveData.payload.doc.data();
            const id = reserveData.payload.doc.id;
            return new ReserveData(id, data.uid, data.campusId);
          })),
          map((result) => {
            console.debug('result', result);
            return new LoadReserveDatasSuccess({
              reserveDatas: [new ReserveDatas(ids.reservesId, result)]
            })
          })
        )*/

    )

}
