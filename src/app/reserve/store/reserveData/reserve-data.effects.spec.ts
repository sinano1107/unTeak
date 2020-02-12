import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ReserveDataEffects } from './reserve-data.effects';

describe('ReserveDataEffects', () => {
  let actions$: Observable<any>;
  let effects: ReserveDataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReserveDataEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ReserveDataEffects>(ReserveDataEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
