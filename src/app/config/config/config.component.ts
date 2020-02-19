import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { User } from '../../class/user';
import { Store } from '@ngrx/store';
import * as fromCore from '../../core/store/reducers';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  myData: User;
  name: string;

  constructor(private store: Store<fromCore.State>,
              private db: AngularFirestore,
              private afs: AngularFireStorage,) {
    this.store.select(fromCore.getSession)
      .subscribe(data => {
        this.myData = data.user;
        this.name = data.user.name;
      })
  }

  ngOnInit() {
  }

  onChangeInput(evt, path: string) {
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
  update(updatePath, path) {
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
  default(path: string) {
    this.afs.storage.ref(`/${this.myData.uid}/${path}`).delete();
    if (path=='icon') {
      this.update('icon.png', 'icon');
    } else {
      this.update('mainimg.jpg', 'back');
    }
  }

  // 名前を変更
  nameUpdate() {
    if (this.name!=this.myData.name && this.name!='') {
      this.db.collection('users')
        .doc(this.myData.uid)
        .update({
          name: this.name
        }).then(() => {
          location.reload()
        })
    }
  }
}