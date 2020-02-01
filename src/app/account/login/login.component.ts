import { Component, OnInit } from '@angular/core';

import { Account } from '../../class/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // アカウント型のaccountを作りinputを保存
  public account = new Account();

  constructor() { }

  ngOnInit() {
  }

}
