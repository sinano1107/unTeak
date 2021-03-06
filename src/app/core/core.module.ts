import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from './store/effects/session.effects';
import { REDUCERS_TOKEN, reducerProvider } from './store/reducers/index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(REDUCERS_TOKEN, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([SessionEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // stateの上限を設定
      logOnly: environment.production, // 開発環境でのみ動作するように制限n
    })
  ],
  providers: [
    reducerProvider
  ],
  exports: []
})
export class CoreModule { }
