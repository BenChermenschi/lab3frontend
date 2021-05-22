import { TestBed } from '@angular/core/testing';

import { ReactieService } from './reactie.service';

describe('ReactieService', () => {
  let service: ReactieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
