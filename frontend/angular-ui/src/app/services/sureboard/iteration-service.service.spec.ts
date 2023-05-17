import { TestBed } from '@angular/core/testing';

import { IterationServiceService } from './iteration-service.service';

describe('IterationServiceService', () => {
  let service: IterationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IterationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
