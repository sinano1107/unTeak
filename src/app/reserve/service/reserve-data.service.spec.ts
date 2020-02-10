import { TestBed } from '@angular/core/testing';

import { ReserveDataService } from './reserve-data.service';

describe('ReserveDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReserveDataService = TestBed.get(ReserveDataService);
    expect(service).toBeTruthy();
  });
});
