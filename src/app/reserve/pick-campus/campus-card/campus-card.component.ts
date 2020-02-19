import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CampusDialogComponent } from './campus-dialog/campus-dialog.component';

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
  campusReserveDatas = [];
  myData: Session;

  constructor(private store: Store<fromCore.State>,
              private reserveData: Store<fromReserveData.State>,
              public matDialog : MatDialog) {}

  ngOnInit() {
    this.reserveData.select(fromReserveData.selectAllReserveDatas).subscribe((reserveDatas) => {
      this.campusReserveDatas = []
      reserveDatas.forEach(reserveData => {
        if (reserveData.campusId==this.campusId && reserveData.reserveId==this.reserveId) {
          this.campusReserveDatas.push(reserveData);
        }
      })
    })

    this.store.select(fromCore.getSession)
      .subscribe(data => {
          this.myData = data;
      })
  }

  // 削除ボタンが押されたとき
    openDialog(event:string){
      // ダイアログの表示
      this.matDialog.open(CampusDialogComponent, {
                  'data': {'campusId': this.campusId, 'reserveId': this.reserveId, 'myUid': this.myData.user.uid},
                  'width' : '500px',
                  'disableClose' : false
                 });
    }

}