import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Session } from './class/session';
import { SessionService } from './core/service/session.service';
import { Store } from '@ngrx/store';
import * as fromCore from './core/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'unTeak';
  isOpen = false;
  session_data: Session;
  session_loading: boolean;
  date = new Date();

  subsc = new Subscription();

  constructor(
    private session: SessionService,
    private router: Router,
    private store: Store<fromCore.State>,
  ) {}

  ngOnInit(): void {
    this.session.checkLogin();

    this.subsc.add(this.store
      .select(fromCore.getSession)
      .subscribe(data => {
          this.session_data = data;
    }));

    this.subsc.add(this.store
      .select(fromCore.getLoading)
      .subscribe(loading => {
        this.session_loading = loading;
    }));
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

  go(link: string): void {
    this.isOpen = false;
    this.router.navigate([link]);
  }

  logout() {
    this.isOpen = false;
    this.session.logout();
    this.router.navigate(['/account/login']);
  }
}
