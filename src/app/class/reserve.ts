// リザーブクラス
// reserveクラスの配列を格納する
// そのデータの日時や亭主によって席が決められているかどうかを格納する
export class Reserve {
  id: string;
  compulsion: boolean;
  date: ReserveDate;

  constructor(id: string, compulsion: boolean, date: ReserveDate) {
    this.id = id;
    this.compulsion = compulsion;
    this.date = date;
  }
}

// dateクラス
export class ReserveDate {
  date: string;
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
  img: string;

  constructor(date: string) {
    this.date = date;
  }

  transform() {
    this.year = Number(this.date.slice(0,4));
    this.month = Number(this.date.slice(4,6));
    this.day = Number(this.date.slice(6,8));
    const dayOfWeek = new Date(this.year, this.month-1, this.day).getDay()
    this.dayOfWeek = [ "日", "月", "火", "水", "木", "金", "土" ]
      [dayOfWeek];
    this.img = `../../../../assets/${
      [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
        [dayOfWeek]
    }.jpeg`;

    return this;
  }
}
