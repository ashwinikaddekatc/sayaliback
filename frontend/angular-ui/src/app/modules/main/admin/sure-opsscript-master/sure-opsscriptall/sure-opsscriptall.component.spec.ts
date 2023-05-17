import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureOpsscriptallComponent } from './sure-opsscriptall.component';

describe('SureOpsscriptallComponent', () => {
  let component: SureOpsscriptallComponent;
  let fixture: ComponentFixture<SureOpsscriptallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureOpsscriptallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureOpsscriptallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
