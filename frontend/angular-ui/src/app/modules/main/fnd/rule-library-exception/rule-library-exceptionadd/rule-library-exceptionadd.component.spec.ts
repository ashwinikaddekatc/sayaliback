import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleLibraryExceptionaddComponent } from './rule-library-exceptionadd.component';

describe('RuleLibraryExceptionaddComponent', () => {
  let component: RuleLibraryExceptionaddComponent;
  let fixture: ComponentFixture<RuleLibraryExceptionaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleLibraryExceptionaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleLibraryExceptionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
