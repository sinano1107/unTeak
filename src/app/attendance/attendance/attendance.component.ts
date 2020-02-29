import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { Now } from '../../class/now';
import { Store } from '@ngrx/store';
import * as fromCore from '../../core/store/reducers';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  myUid: string;
  input_at_Code = 'x';
  true_at_Code = 'y';
  isAttended = false;
  groupSizeList = (new Array(18)).fill(0);
  reserveDataList = (new Array(18)).fill(0);
  selectList = [];
  select: number;


  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private store: Store<fromCore.State>,
  ) { }

  ngOnInit() {
    // input_at_Code読み込み
    this.route.params.subscribe(params => {
      this.input_at_Code = params['at_Code'];
    });

    // true_at_Code読み込み
    this.db.collection('communities')
      .doc('g3Xnp6T1S9xwsDhZLyYZ')
      .valueChanges().subscribe(res => {
        this.true_at_Code = res['at_Code'];
      });

    // myUid読み込み
    this.store.select(fromCore.getSession)
      .subscribe(res => {
        const myUid = res.user.uid;
        this.myUid = myUid;

        // nows読み込み
        this.db.collection('communities')
          .doc('g3Xnp6T1S9xwsDhZLyYZ')
          .collection('nows')
          .valueChanges().subscribe(nows => {

            for (let i=0; i<nows.length; i++) {
              this.groupSizeList[nows[i].campusId]+=1;

              if (nows[i].uid == myUid) {
                this.isAttended = true;
                break
              }
            }
          });

      });

  }

  // 1 => 01, 2 => 02
  getdoubleDigestNumber(number: number): string {
    return ("0" + number).slice(-2)
  }

  getReserveId(toDay: number) {
    this.db.collection('communities')
      .doc('g3Xnp6T1S9xwsDhZLyYZ')
      .collection('reserves')
      .snapshotChanges().subscribe(reserves => {
        for (let i=0; i<reserves.length; i++) {
          const doc = reserves[i].payload.doc;
          if (doc.data().date == toDay) {
            this.searchMyReserveData(doc.id);
            break
          }
        }
        this.makeSelect();
      })
  }

  attendance() {
    // todo: 現在時刻を取得
    const nowDate = new Date();
    let breakTime = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 9, 30);

    // todo: 9:30以前の場合reserveDataを調べる
    if (breakTime >= nowDate) {
      // 9:30以前の場合
      const toDay = Number(`${nowDate.getFullYear()}${this.getdoubleDigestNumber(nowDate.getMonth()+1)}${this.getdoubleDigestNumber(nowDate.getDate())}`);
      this.getReserveId(toDay)
    } else {
      // 9:31以降の場合
      const min = Math.min.apply(null, this.groupSizeList);
      let minGroupList = []
      this.groupSizeList.map((groupSize, index) => {
        if (groupSize == min) {
          minGroupList.push(index);
        }
      })
      this.addNow(minGroupList[Math.floor( Math.random() * minGroupList.length )]);
    }
  }

  addNow(campusId: number): void {
    const now = new Date();
    this.db.collection('communities')
      .doc('g3Xnp6T1S9xwsDhZLyYZ')
      .collection('nows')
      .add(
        new Now(
          this.myUid,
          campusId,
          Number(`${now.getHours()}${this.getdoubleDigestNumber(now.getMinutes())}`),
        ).deserialize()
      ).then(() => {
        alert(`あなたはグループ${Number(campusId)+1}に登校しました！`);
        this.isAttended = true;
      })
      .catch(() => alert('登校に失敗しました...'));
  }

  searchMyReserveData(reserveId: string) {
    this.db.collection('communities')
      .doc('g3Xnp6T1S9xwsDhZLyYZ')
      .collection('reserveDatas')
      .valueChanges().subscribe(reserveDatas => {
        for (let i=0; i<reserveDatas.length; i++) {
          const reserveData = reserveDatas[i];
          this.reserveDataList[reserveData.campusId] += 1;
          if (reserveData.reserveId==reserveId && reserveData.uid==this.myUid) {
            this.addNow(reserveData.campusId);
            break
          } else if (i == reserveDatas.length-1) {
            // 予約していなかった時の処理
            this.makeSelect()
          }
        }
      })
  }

  makeSelect() {
    for (let i=0; i<18; i++) {
      const count = this.groupSizeList[i] + this.reserveDataList[i]
      if (count != 6) {
        this.selectList.push(i);
        if (this.selectList.length==1) {
          this.select = count;
        }
      }
    }
  }
}
