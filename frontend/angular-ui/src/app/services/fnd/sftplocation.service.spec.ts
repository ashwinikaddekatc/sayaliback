import { TestBed } from '@angular/core/testing';

import { SftplocationService } from './sftplocation.service';

describe('SftplocationService', () => {
  let service: SftplocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SftplocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
