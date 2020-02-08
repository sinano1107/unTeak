// リザーブデータクラス
// 予約している人・場所のデータを格納する
export class ReserveData {
  id: string
  uid: string;
  campusId: string;

  constructor(id: string, uid: string, campusId: string) {
    this.id = id;
    this.uid = uid;
    this.campusId = campusId;
  }
}
