// ユーザークラス
// ユーザーの情報を保持する
export class User {
  uid: string;
  name: string;

  constructor(uid?: string, name?: string) {
    this.uid = (uid) ? uid : '';
    this.name = (name) ? name : '';
  }
}
