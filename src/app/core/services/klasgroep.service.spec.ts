import { TestBed } from '@angular/core/testing';

import { KlasgroepService } from './klasgroep.service';

describe('KlasgroepService', () => {
  let service: KlasgroepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlasgroepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
