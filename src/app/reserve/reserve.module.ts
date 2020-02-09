import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReserveRoutingModule } from './reserve-routing.module';
import { ReserveComponent } from './reserve/reserve.component';
import { StoreModule } from '@ngrx/store';
import * as fromReserve from './store/reserve/reserve.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReserveEffects } from './store/reserve/reserve.effects';
import * as fromReserveData from './store/reserveData/reserve-data.reducer';
import { ReserveDataEffects } from './store/reserveData/reserve-data.effects';


@NgModule({
  declarations: [ReserveComponent,],
  imports: [
    CommonModule,
    ReserveRoutingModule,
    StoreModule.forFeature('reserve', fromReserve.reducer),
    EffectsModule.forFeature([ReserveEffects, ReserveDataEffects]),
    StoreModule.forFeature('reserveData', fromReserveData.reducer),
  ]
})
export class ReserveModule { }
