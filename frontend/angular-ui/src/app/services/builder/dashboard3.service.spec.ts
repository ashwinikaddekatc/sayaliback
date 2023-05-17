import { TestBed } from '@angular/core/testing';

import { Dashboard3Service } from './dashboard3.service';

describe('Dashboard3Service', () => {
  let service: Dashboard3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dashboard3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
