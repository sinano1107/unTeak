import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { Now } from '../../class/now';
import { Store } from '@ngrx/store';
import * as fromCore from '../../core/store/reducers';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit, OnDestroy {

  myUid: string;
  input_at_Code = 'x';
  true_at_Code = 'y';
  isAttended = false;
  groupSizeList = (new Array(18)).fill(0);
  reserveDataList = (new Array(18)).fill(0);
  selectList = [];
  select: number;

  subsc = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private store: Store<fromCore.State>,
  ) { }

  ngOnInit(): void {
    // input_at_Code読み込み
    this.subsc.add(this.route.params
      .subscribe(params => {
        this.input_at_Code = params['at_Code'];
    }));

    // true_at_Code読み込み
    this.subsc.add(this.db
      .collection('communities')
      .doc('g3Xnp6T1S9xwsDhZLyYZ')
      .valueChanges().subscribe(res => {
        this.true_at_Code = res['at_Code'];
    }));

    // myUid読み込み
    this.subsc.add(this.store
      .select(fromCore.getSession)
      .subscribe(res => {
        const myUid = res.user.uid;
        this.myUid = myUid;

        // nows読み込み
        this.subsc.add(this.db.collection('communities')
          .doc('g3Xnp6T1S9xwsDhZLyYZ')
          .collection('nows')
          .valueChanges().subscribe(nows => {
            for (let i=0; i<nows.length; i++) {
              // グループの人数表作成
              this.groupSizeList[nows[i].campusId]+=1;
              // 自分がいたら登校済みと判断する
              if (nows[i].uid == myUid) {
                this.isAttended = true;
                break
              }
            }
          }));
      }));
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  // 1 => 01, 2 => 02
  getdoubleDigestNumber(number: number): string {
    return ("0" + number).slice(-2);
  }

  // 今日の日程があるか検索
  getReserveId(toDay: number): void {
    this.subsc.add(this.db.collection('communities')
      .doc('g3Xnp6T1S9xwsDhZLyYZ')
      .collection('reserves', ref => {
        return ref.where("date", "==", toDay);
      })
      .snapshotChanges()
      .subscribe(res => {
        res.length===0 ?
          this.makeSelect()
          : this.searchMyReserveData(res[0].payload.doc.id);
      }));

  }

  attendance(): void {
    const nowDate = new Date();
    let breakTime = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 9, 30);

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
          Number(`${now.getHours()}${this.getdoubleDigestNumber(now.getMinutes())}${this.getdoubleDigestNumber(now.getSeconds())}`),
        ).deserialize()
      ).then(() => {
        alert(`あなたはグループ${Number(campusId)+1}に登校しました！`);
        this.isAttended = true;
      })
      .catch(() => alert('登校に失敗しました...'));
  }

  // 自分の今日の予約を探す
  searchMyReserveData(reserveId: string): void {
    const reserveDatasRef = this.db.collection('communities')
      .doc('g3Xnp6T1S9xwsDhZLyYZ')
      .collection('reserveDatas');
    const x = reserveDatasRef.snapshotChanges()
      .subscribe(reserveDatas => {
        if (reserveDatas.length===0) {
          this.makeSelect()
        } else {
          for (let i=0; i<reserveDatas.length; i++) {
            const reserveData = reserveDatas[i];
            const data = reserveData.payload.doc.data();
            this.reserveDataList[data.campusId] += 1;
            if (data.reserveId==reserveId && data.uid==this.myUid) {
              this.addNow(data.campusId);
              x.unsubscribe();
              // 予約データ削除
              reserveDatasRef.doc(reserveData.payload.doc.id).delete();
              break
            } else if (i == reserveDatas.length-1) {
              this.makeSelect()
            }
          }
        }
      })
  }

  makeSelect(): void {
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
