import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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

  reserves: Observable<Reserve[]>;

  constructor(private reserve: Store<fromReserve.State>) {
    this.reserve.dispatch(new LoadReserves({ reserves: [] }));
    this.reserves = this.reserve.select(fromReserve.selectAllReserves);
  }

  ngOnInit() {
  }

}
