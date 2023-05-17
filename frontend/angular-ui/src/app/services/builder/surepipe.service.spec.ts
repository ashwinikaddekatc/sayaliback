import { TestBed } from '@angular/core/testing';

import { SurepipeService } from './surepipe.service';

describe('SurepipeService', () => {
  let service: SurepipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurepipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
