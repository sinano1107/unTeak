import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromReserve from '../store/reserve/reserve.reducer';
import * as fromReserveData from '../store/reserveData/reserve-data.reducer';
import { LoadReserveDatas } from '../store/reserveData/reserve-data.actions';
import { LoadReserves } from '../store/reserve/reserve.actions';

@Component({
  selector: 'app-pick-campus',
  templateUrl: './pick-campus.component.html',
  styleUrls: ['./pick-campus.component.css']
})
export class PickCampusComponent implements OnInit {

  x = [...Array(9).keys()];
  y = [...Array(9).keys()].map(i => i+9);

  isExistence = false;
  reserveId: string;

  constructor(private route: ActivatedRoute,
              private reserve: Store<fromReserveData.State>,
              private reserveData: Store<fromReserveData.State>) {
    this.reserve.dispatch(new LoadReserves({ reserves: [] }));

    // reserveIdsが存在するか調べる
    this.reserve.select(fromReserve.selectReserveIds).subscribe(reserveIds => {
      this.route.params.subscribe(params => {
        this.reserveId = params['reserveId'];

        for (let i=0; i<reserveIds.length; i++) {
          if (reserveIds[i] == params['reserveId']) {
            // 存在したら
            this.isExistence = true;
            this.reserveData.dispatch(new LoadReserveDatas({ reserveDatas: [] }));
            break
          }
        }
      })
    })
  }

  ngOnInit() {}
}
