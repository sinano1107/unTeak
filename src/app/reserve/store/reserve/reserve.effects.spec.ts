import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ReserveEffects } from './reserve.effects';

describe('ReserveEffects', () => {
  let actions$: Observable<any>;
  let effects: ReserveEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReserveEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ReserveEffects>(ReserveEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
