import { User } from './user';

// セッションクラス
// ログインしているか？そのユーザーは誰か？の情報を保持する
export class Session {
  login: boolean;
  user: User;

  constructor(init?: User) {
    this.login = (!!init);
    this.user = (init) ? new User(init.uid, init.name) : new User();
  }

  reset(): Session {
    this.login = false;
    this.user = new User();
    return this;
  }
}
