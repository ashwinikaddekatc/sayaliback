import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureOpsscriptupdateComponent } from './sure-opsscriptupdate.component';

describe('SureOpsscriptupdateComponent', () => {
  let component: SureOpsscriptupdateComponent;
  let fixture: ComponentFixture<SureOpsscriptupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureOpsscriptupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureOpsscriptupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
