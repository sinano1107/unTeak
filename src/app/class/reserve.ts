// リザーブクラス
// reserveクラスの配列を格納する
// そのデータの日時や亭主によって席が決められているかどうかを格納する
export class Reserve {
  id: string;
  compulsion: boolean;
  date: number;

  constructor(id: string, compulsion: boolean, date: number) {
    this.id = id;
    this.compulsion = compulsion;
    this.date = date;
  }
}
