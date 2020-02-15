// ユーザークラス
// ユーザーの情報を保持する
export class User {
  uid: string;
  name: string;
  icon: string;
  back: string;

  constructor(uid?: string, name?: string, icon?: string, back?: string) {
    this.uid = (uid) ? uid : '';
    this.name = (name) ? name : '';
    this.icon = (icon) ? icon : '';
    this.back = (back) ? back : '';
  }
}
