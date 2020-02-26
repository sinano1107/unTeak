import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Session } from './class/session';
import { SessionService } from './core/service/session.service';
import { Store } from '@ngrx/store';
import * as fromCore from './core/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unTeak';
  isOpen = false;
  session_data: Session;
  session_loading: boolean;
  date = new Date();

  constructor(private session: SessionService,
              private router: Router,
              private store: Store<fromCore.State>) {
    this.session.checkLogin();
    this.store.select(fromCore.getSession)
      .subscribe(data => {
          this.session_data = data;
      })
    this.store.select(fromCore.getLoading)
      .subscribe(loading => {
        this.session_loading = loading;
      })
  }

  go(link: string) {
    this.isOpen = false;
    this.router.navigate([link]);
  }

  logout() {
    this.isOpen = false;
    this.session.logout();
    this.router.navigate(['/account/login']);
  }
}
