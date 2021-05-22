import { TestBed } from '@angular/core/testing';

import { VakService } from './vak.service';

describe('VakService', () => {
  let service: VakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
