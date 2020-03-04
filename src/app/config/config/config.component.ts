import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';

import { User } from '../../class/user';
import { Store } from '@ngrx/store';
import * as fromCore from '../../core/store/reducers';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit, OnDestroy {

  myData: User;
  name: string;
  loading: boolean;

  subsc = new Subscription();

  constructor(
    private store: Store<fromCore.State>,
    private db: AngularFirestore,
    private afs: AngularFireStorage,
  ) {}

  ngOnInit(): void {
    this.subsc.add(this.store
      .select(fromCore.getSession)
      .subscribe(data => {
        this.myData = data.user;
        this.name = data.user.name;
    }));
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  onChangeInput(evt, path: string): void {
    this.loading = true;
    const file: File = evt.target.files[0];

    // 保存先,ファイル名を指定
    const filePath = `${this.myData.uid}/${path}`;

    console.debug(filePath);

    // uploadメソッドでファイルをアップロード
    this.afs.upload(filePath, file).then(() => {
      console.debug('アップロード完了');
      this.update(filePath, path);
    });
  }

  // アップロードした画像のパスにアップデートする
  update(updatePath, path): void {
    if (path=='icon') {
      this.db.collection('users')
        .doc(this.myData.uid)
        .update({
          icon: '/' + updatePath
        }).then(() => {
          location.reload();
        })
    } else {
      this.db.collection('users')
        .doc(this.myData.uid)
        .update({
          back: '/' + updatePath
        }).then(() => {
          location.reload();
        })
    }
  }

  // デフォルト画像に戻す
  default(path: string): void {
    this.loading = true;
    this.afs.storage.ref(`/${this.myData.uid}/${path}`).delete();
    if (path=='icon') {
      this.update('icon.png', 'icon');
    } else {
      this.update('mainimg.jpg', 'back');
    }
  }

  // 名前を変更
  nameUpdate(): void {
    if (this.name!=this.myData.name && this.name!='') {
      this.db.collection('users')
        .doc(this.myData.uid)
        .update({
          name: this.name
        }).then(() => {
          location.reload()
        });
    }
  }
}
