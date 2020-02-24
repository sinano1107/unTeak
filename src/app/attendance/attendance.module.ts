import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance/attendance.component';


@NgModule({
  declarations: [AttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule,
  ]
})
export class AttendanceModule { }
