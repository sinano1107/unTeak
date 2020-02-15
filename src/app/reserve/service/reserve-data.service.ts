import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ReserveData } from '../../class/reserve-data';
import * as fromReserveData from '../store/reserveData/reserve-data.reducer';
import { AddReserveData, UpdateReserveData, DeleteReserveData } from '../store/reserveData/reserve-data.actions';

@Injectable({
  providedIn: 'root'
})
export class ReserveDataService {

  public reserveDatas: Observable<ReserveData[]>

  constructor(private store: Store<fromReserveData.State>) {
    this.reserveDatas = this.store.select(fromReserveData.selectAllReserveDatas);
  }

  // reserveDataの追加
  add(reserveData: ReserveData): void {
    this.store.dispatch(new AddReserveData({
      reserveData: reserveData
    }))
  }

  // reserveDataの更新
  update(id: string, reserveData: ReserveData): void {
    this.store.dispatch(new UpdateReserveData({
      reserveData: {id: id, changes: reserveData}
    }))
  }

  // reserveDataの削除
  delete(id: string): void {
    this.store.dispatch(new DeleteReserveData({
      id: id
    }))
  }

  // 予約関数
  async reservation(uid: string, reserveId: string, campusId: string) {
    const id = await this.searchMyReserveData(uid, reserveId);

    if (id != '' && typeof(id) == 'string') {
      // 存在したら
      this.update(id, new ReserveData(reserveId, uid, campusId));
    } else {
      // 存在しなかったら
      this.add(new ReserveData(reserveId, uid, campusId));
    }
  }

  // reserveDatasにuidさんのデータがあるか調べる
  searchMyReserveData(uid: string, reserveId: string) {
    return new Promise<String>(resolve => {
      this.reserveDatas.forEach((reserveDatas) => {
        //console.debug('reserveDatas', reserveDatas);
        reserveDatas.forEach((reserveData) => {
          if (reserveData.uid == uid && reserveData.reserveId == reserveId) {
            // 存在したら
            resolve(reserveData.id);
          }
        })
      })
      resolve('');
    })
  }
}
