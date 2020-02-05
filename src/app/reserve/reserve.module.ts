import { NgModule } from '@angular/core';

import { ReserveRoutingModule } from './reserve-routing.module';
import { ReserveComponent } from './reserve/reserve.component';


@NgModule({
  declarations: [ReserveComponent,],
  imports: [
    ReserveRoutingModule,
  ]
})
export class ReserveModule { }
