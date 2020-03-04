import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CampusDialogComponent } from './campus-dialog/campus-dialog.component';
import { Subscription } from 'rxjs';

import { Session } from '../../../class/session';
import { Store } from '@ngrx/store';
import * as fromCore from '../../../core/store/reducers';
import * as fromReserveData from '../../store/reserveData/reserve-data.reducer';

@Component({
  selector: 'app-campus-card',
  templateUrl: './campus-card.component.html',
  styleUrls: ['./campus-card.component.css']
})
export class CampusCardComponent implements OnInit {

  @Input() classItem: string;
  @Input() campusId: string;
  @Input() reserveId: string;
  campusReserveDataCount: number;
  myData: Session;

  subsc = new Subscription();

  constructor(
    private store: Store<fromCore.State>,
    private reserveData: Store<fromReserveData.State>,
    public matDialog : MatDialog,
  ) {}

  ngOnInit(): void {
    this.subsc.add(this.reserveData.select(fromReserveData.selectAllReserveDatas)
      .subscribe((reserveDatas) => {
        this.campusReserveDataCount = 0;
        reserveDatas.forEach(reserveData => {
          if (reserveData.campusId==this.campusId && reserveData.reserveId==this.reserveId) {
            this.campusReserveDataCount+=1;
          }
    })}));

    this.subsc.add(this.store.select(fromCore.getSession)
      .subscribe(data => {
        this.myData = data;
    }));
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  // 削除ボタンが押されたとき
  openDialog(): void {
    // ダイアログの表示
    this.matDialog.open(CampusDialogComponent, {
      'data': {'campusId': this.campusId, 'reserveId': this.reserveId, 'myUid': this.myData.user.uid},
      'width' : '500px',
      'disableClose' : false
     });
  }

}
