import { TestBed } from '@angular/core/testing';

import { Webhookservicesui1Service } from './webhookservicesui1.service';

describe('Webhookservicesui1Service', () => {
  let service: Webhookservicesui1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Webhookservicesui1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
