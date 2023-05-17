import { TestBed } from '@angular/core/testing';

import { NewwebhookService } from './newwebhook.service';

describe('NewwebhookService', () => {
  let service: NewwebhookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewwebhookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
