import { Component, OnInit } from '@angular/core';

import { Reserve } from '../../class/reserve';
import { Store } from '@ngrx/store';
import * as fromReserve from '../store/reserve/reserve.reducer';
import { LoadReserves } from '../store/reserve/reserve.actions';

@Component({
  selector: 'app-pick-date',
  templateUrl: './pick-date.component.html',
  styleUrls: ['./pick-date.component.css']
})
export class PickDateComponent implements OnInit {

  reserves: Reserve[];
  loading: boolean;

  constructor(private reserve: Store<fromReserve.State>) {
    this.reserve.dispatch(new LoadReserves({ reserves: [] }));
    this.reserve.select(fromReserve.selectAllReserves).subscribe(
      reserves => {
        this.reserves = reserves;
      }
    );
    this.reserve.select(fromReserve.getReserveLoading).subscribe(
      loading => {
        this.loading = loading;
      }
    )
  }

  ngOnInit() {
  }

}
