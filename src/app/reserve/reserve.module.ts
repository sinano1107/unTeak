import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatChipsModule } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';

import { ReserveRoutingModule } from './reserve-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromReserve from './store/reserve/reserve.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReserveEffects } from './store/reserve/reserve.effects';
import * as fromReserveData from './store/reserveData/reserve-data.reducer';
import { ReserveDataEffects } from './store/reserveData/reserve-data.effects';
import { PickDateComponent } from './pick-date/pick-date.component';
import { DateCardComponent } from './pick-date/date-card/date-card.component';
import { PickCampusComponent } from './pick-campus/pick-campus.component';
import { CampusCardComponent } from './pick-campus/campus-card/campus-card.component';
import { CampusDialogComponent } from './pick-campus/campus-card/campus-dialog/campus-dialog.component';
import { UserChipComponent } from './pick-campus/campus-card/campus-dialog/user-chip/user-chip.component';
import { ImageModule } from '../image/image.module';


@NgModule({
  declarations: [PickDateComponent, DateCardComponent, PickCampusComponent, CampusCardComponent, CampusDialogComponent, UserChipComponent,],
  imports: [
    CommonModule,
    FormsModule,
    ReserveRoutingModule,
    StoreModule.forFeature('reserve', fromReserve.reducer),
    EffectsModule.forFeature([ReserveEffects, ReserveDataEffects]),
    StoreModule.forFeature('reserveData', fromReserveData.reducer),
    MatDialogModule,
    MatChipsModule,
    ImageModule
  ],
  entryComponents: [
    CampusDialogComponent
  ],
  providers: [
    AngularFireStorage
  ]
})
export class ReserveModule { }
