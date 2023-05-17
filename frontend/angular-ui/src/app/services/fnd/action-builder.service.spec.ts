import { TestBed } from '@angular/core/testing';

import { ActionBuilderService } from './action-builder.service';

describe('ActionBuilderService', () => {
  let service: ActionBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
