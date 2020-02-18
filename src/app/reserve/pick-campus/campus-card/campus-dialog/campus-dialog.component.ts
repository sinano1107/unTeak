import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { ReserveDataService } from '../../../service/reserve-data.service';
import { Store } from '@ngrx/store';
import * as fromReserveData from '../../../store/reserveData/reserve-data.reducer';

@Component({
  selector: 'app-campus-dialog',
  templateUrl: './campus-dialog.component.html',
  styleUrls: ['./campus-dialog.component.css']
})
export class CampusDialogComponent implements OnInit {

  // dialogInputでcampusId, reserveId, myUidを受け取っています。
  isMe = ''; // 自分のデータがあったらそのid, なかったら空
  campusReserveDatas = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data : any,
              public matDialogRef : MatDialogRef<CampusDialogComponent>,
              private reserveData: Store<fromReserveData.State>,
              private reserveDataService: ReserveDataService) { }

  ngOnInit() {
    this.reserveData.select(fromReserveData.selectAllReserveDatas).subscribe(
      reserveDatas => {
        this.isMe = ''; // isMeリセット
        reserveDatas.forEach(reserveData => {
          if (reserveData.campusId==this.data.campusId && reserveData.reserveId==this.data.reserveId) {
            this.campusReserveDatas.push(reserveData);
            // 自分の予約データだったら
            if (reserveData.uid == this.data.myUid) {
              this.isMe = reserveData.id;
            }
          }
        })
    })
  }

  reservation() {
    console.debug('reservation!');
    this.reserveDataService.reservation(this.data.myUid, this.data.reserveId, this.data.campusId);
    this.matDialogRef.close();
  }

  cancel() {
    console.debug('cancel...');
    this.reserveDataService.delete(this.isMe);
    this.matDialogRef.close();
  }

}
