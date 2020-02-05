import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    AccountRoutingModule,
    FormsModule,
  ]
})
export class AccountModule { }
