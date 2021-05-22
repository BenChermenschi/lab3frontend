import { TestBed } from '@angular/core/testing';

import { VragenlijstService } from './vragenlijst.service';

describe('VragenlijstService', () => {
  let service: VragenlijstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VragenlijstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
