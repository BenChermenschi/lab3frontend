import { TestBed } from '@angular/core/testing';

import { GebruikerstypeService } from './gebruikerstype.service';

describe('GebruikerstypeService', () => {
  let service: GebruikerstypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GebruikerstypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
