import { TestBed } from '@angular/core/testing';

import { LinebuilderService } from './linebuilder.service';

describe('LinebuilderService', () => {
  let service: LinebuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinebuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
