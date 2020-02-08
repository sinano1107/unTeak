import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../class/user';
import { Reserve } from '../../class/reserve';
import { Store } from '@ngrx/store';
import * as fromCore from '../../core/store/reducers';
import * as fromReserve from '../store/reserve.reducer';
import { LoadReserves } from '../store/reserve.actions';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  public session: User
  public reserves: Observable<Reserve[]>

  constructor(private reserve: Store<fromReserve.State>,
              private store: Store<fromCore.State>) {
    this.store.select(fromCore.getSession)
      .subscribe(data => {
        console.debug('session',data);
        this.session = data.user;
      })
    this.reserves = this.reserve.select(fromReserve.selectAllReserves)
  }

  ngOnInit() {
    this.store.dispatch(new LoadReserves({ reserves: [] }));
  }

}
