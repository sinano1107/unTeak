import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReserveRoutingModule } from './reserve-routing.module';
import { ReserveComponent } from './reserve/reserve.component';
import { StoreModule } from '@ngrx/store';
import * as fromReserve from './store/reserve.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReserveEffects } from './store/reserve.effects';


@NgModule({
  declarations: [ReserveComponent,],
  imports: [
    CommonModule,
    ReserveRoutingModule,
    StoreModule.forFeature('reserve', fromReserve.reducer),
    EffectsModule.forFeature([ReserveEffects]),
  ]
})
export class ReserveModule { }
