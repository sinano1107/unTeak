import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImageModule } from '../image/image.module';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config/config.component';
import { LoadingModule } from '../loading/loading.module';


@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    FormsModule,
    ImageModule,
    LoadingModule
  ]
})
export class ConfigModule { }
