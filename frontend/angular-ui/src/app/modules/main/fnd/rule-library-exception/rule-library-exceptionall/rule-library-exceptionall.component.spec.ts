import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleLibraryExceptionallComponent } from './rule-library-exceptionall.component';

describe('RuleLibraryExceptionallComponent', () => {
  let component: RuleLibraryExceptionallComponent;
  let fixture: ComponentFixture<RuleLibraryExceptionallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleLibraryExceptionallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleLibraryExceptionallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
