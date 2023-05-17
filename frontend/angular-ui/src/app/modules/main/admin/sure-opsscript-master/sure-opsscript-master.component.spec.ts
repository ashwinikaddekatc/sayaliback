import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureOpsscriptMasterComponent } from './sure-opsscript-master.component';

describe('SureOpsscriptMasterComponent', () => {
  let component: SureOpsscriptMasterComponent;
  let fixture: ComponentFixture<SureOpsscriptMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureOpsscriptMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureOpsscriptMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
