import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickDateComponent } from './pick-date/pick-date.component';
import { PickCampusComponent } from './pick-campus/pick-campus.component';

const routes: Routes = [
  { path: '', component: PickDateComponent },
  { path: 'pick-campus/:reserveId', component: PickCampusComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveRoutingModule { }
