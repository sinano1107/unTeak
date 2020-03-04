import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Subscription } from 'rxjs';

import { ReserveDataService } from '../../../service/reserve-data.service';
import { Store } from '@ngrx/store';
import * as fromReserveData from '../../../store/reserveData/reserve-data.reducer';
import * as fromReserve from '../../../store/reserve/reserve.reducer';

@Component({
  selector: 'app-campus-dialog',
  templateUrl: './campus-dialog.component.html',
  styleUrls: ['./campus-dialog.component.css']
})
export class CampusDialogComponent implements OnInit, OnDestroy {

  // dialogInputでcampusId, reserveId, myUidを受け取っています。
  isMe = ''; // 自分のデータがあったらそのid, なかったら空
  campusReserveDatas = [];
  compulsion = true;
  loading: boolean;

  subsc = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    public matDialogRef : MatDialogRef<CampusDialogComponent>,
    private reserveData: Store<fromReserveData.State>,
    private reserveDataService: ReserveDataService,
    private reserve: Store<fromReserve.State>,
  ) {}

  ngOnInit(): void {
    this.subsc.add(this.reserve
      .select(fromReserve.selectReserveEntities)
      .subscribe(
        reserves => {
          this.compulsion = reserves[this.data.reserveId].compulsion;
    }));

    this.subsc.add(this.reserveData
      .select(fromReserveData.selectAllReserveDatas)
        .subscribe(
          reserveDatas => {
            reserveDatas.length==0 ? this.loading=false : this.loading=true;
            this.isMe = ''; // isMeリセット
            for (let i=0; i<reserveDatas.length; i++) {
              const reserveData = reserveDatas[i];
              if (reserveData.campusId==this.data.campusId && reserveData.reserveId==this.data.reserveId) {
                this.campusReserveDatas.push(reserveData);
                // 自分の予約データだったら
                if (reserveData.uid == this.data.myUid) {
                  this.isMe = reserveData.id;
                }
              }
              if (i==reserveDatas.length-1) {
                this.loading = false;
              }
            }
    }));
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  reservation(): void {
    console.debug('reservation!');
    this.reserveDataService.reservation(this.data.myUid, this.data.reserveId, this.data.campusId);
    this.matDialogRef.close();
  }

  cancel(): void {
    console.debug('cancel...');
    this.reserveDataService.delete(this.isMe);
    this.matDialogRef.close();
  }

}
