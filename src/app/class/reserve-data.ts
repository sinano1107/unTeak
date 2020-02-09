// リザーブデータクラス
// 予約している人・場所のデータを格納する
export class ReserveData {
  id?: string;
  reserveId: string;
  uid: string;
  campusId: string;

  constructor(reserveId: string , uid: string, campusId: string, id?: string) {
    this.id = id;
    this.reserveId = reserveId;
    this.uid = uid;
    this.campusId = campusId;
  }

  deserialize() {
    let obj = Object.freeze({reserveId: this.reserveId, uid: this.uid, campusId: this.campusId});
    return Object.assign({}, obj);
  }
}
