import { Component } from '@angular/core';

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

  constructor(private session: SessionService,
              private store: Store<fromCore.State>) {
    this.session.checkLogin();
    this.store.select(fromCore.getSession)
      .subscribe(data => {
          this.session_data = data;
      })
  }
}
