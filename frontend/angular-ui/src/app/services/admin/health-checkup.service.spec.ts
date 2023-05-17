import { TestBed } from '@angular/core/testing';

import { HealthCheckupService } from './health-checkup.service';

describe('HealthCheckupService', () => {
  let service: HealthCheckupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthCheckupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
