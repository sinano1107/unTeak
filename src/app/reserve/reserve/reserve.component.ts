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
import { LoadReserveDatas, AddReserveData, UpdateReserveData, DeleteReserveData } from '../store/reserveData/reserve-data.actions';
import { ReserveDataService } from '../service/reserve-data.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  public session: User;
  public reserves: Observable<Reserve[]>;
  public reserveDatas: Observable<ReserveData[]>;
  public update_reserveData = new ReserveData('', '', '');

  constructor(private reserve: Store<fromReserve.State>,
              private store: Store<fromCore.State>,
              private reserveData: Store<fromReserveData.State>,
              private reserveDataService: ReserveDataService) {
    this.store.select(fromCore.getSession)
      .subscribe(data => {
        console.debug('session',data);
        this.session = data.user;
      })
    this.reserves = this.reserve.select(fromReserve.selectAllReserves);
    this.reserveDatas = this.reserveData.select(fromReserveData.selectAllReserveDatas);
  }

  ngOnInit() {
    this.store.dispatch(new LoadReserves({ reserves: [] }));
    this.store.dispatch(new LoadReserveDatas({ reserveDatas: [] }));
  }

  add() {
    this.reserveDataService.add(new ReserveData('最初の予約','x','最初のキャンパス'));
  }

  update(id: string, reserveData: ReserveData) {
    this.update_reserveData = new ReserveData('','','');
    this.reserveDataService.update(id, reserveData);
  }

  delete(id: string) {
    this.reserveDataService.delete(id);
  }

  reservation() {
    this.reserveDataService.reservation('x', new ReserveData('二番目の予約','x','二番目のキャンパス'));
  }

}
