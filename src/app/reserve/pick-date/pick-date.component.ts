import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Reserve } from '../../class/reserve';
import { Store } from '@ngrx/store';
import * as fromReserve from '../store/reserve/reserve.reducer';
import { LoadReserves } from '../store/reserve/reserve.actions';

@Component({
  selector: 'app-pick-date',
  templateUrl: './pick-date.component.html',
  styleUrls: ['./pick-date.component.css']
})
export class PickDateComponent implements OnInit, OnDestroy {

  reserves: Reserve[];
  loading: boolean;

  subsc = new Subscription();

  constructor(private reserve: Store<fromReserve.State>) {}

  ngOnInit(): void {
    this.reserve.dispatch(new LoadReserves({ reserves: [] }));
    this.subsc.add(this.reserve
      .select(fromReserve.selectAllReserves)
      .subscribe(
        reserves => {
          this.reserves = reserves;
    }));

    this.subsc.add(this.reserve
      .select(fromReserve.getReserveLoading)
      .subscribe(
        loading => {
          this.loading = loading;
    }));
  }

  ngOnDestroy(): void {
    this.subsc.unsubscribe();
  }

}
