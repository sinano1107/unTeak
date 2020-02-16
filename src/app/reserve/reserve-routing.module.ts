import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickDateComponent } from './pick-date/pick-date.component';

const routes: Routes = [
  { path: '', component: PickDateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveRoutingModule { }
