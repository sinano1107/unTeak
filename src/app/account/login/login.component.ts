import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../core/service/session.service';
import { Account } from '../../class/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // アカウント型のaccountを作りinputを保存
  public account = new Account();

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  submitLogin() {
    if (this.account.email!='' && this.account.password!='') {
      this.sessionService.login(this.account);
    }
  }

}
