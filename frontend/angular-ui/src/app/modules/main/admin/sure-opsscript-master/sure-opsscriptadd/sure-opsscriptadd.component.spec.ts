import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureOpsscriptaddComponent } from './sure-opsscriptadd.component';

describe('SureOpsscriptaddComponent', () => {
  let component: SureOpsscriptaddComponent;
  let fixture: ComponentFixture<SureOpsscriptaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureOpsscriptaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureOpsscriptaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
