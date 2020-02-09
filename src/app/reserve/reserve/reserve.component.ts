import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../class/user';
import { Reserve } from '../../class/reserve';
import { ReserveData } from '../../class/reserve-data';
import { Store } from '@ngrx/store';
import * as fromCore from '../../core/store/reducers';
import * as fromReserve from '../store/reserve/reserve.reducer';
import { LoadReserves } from '../store/reserve/reserve.actions';
import * as fromReserveData from '../store/reserveData/reserve-data.reducer';
import { LoadReserveDatas } from '../store/reserveData/reserve-data.actions';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  public session: User;
  public reserves: Observable<Reserve[]>;
  public reserveDatas: Observable<ReserveData[]>;
  public reserveIds: Observable<string[] | number[]>;

  constructor(private reserve: Store<fromReserve.State>,
              private store: Store<fromCore.State>,
              private reserveData: Store<fromCore.State>,) {
    this.store.select(fromCore.getSession)
      .subscribe(data => {
        console.debug('session',data);
        this.session = data.user;
      })
    this.reserves = this.reserve.select(fromReserve.selectAllReserves);
    this.reserveDatas = this.reserveData.select(fromReserveData.selectAllReserveDatas);
    this.reserveIds = this.reserve.select(fromReserve.selectReserveIds);
  }

  ngOnInit() {
    this.store.dispatch(new LoadReserves({ reserves: [] }));
    this.store.dispatch(new LoadReserveDatas({ reserveDatas: [] }));
  }

}
