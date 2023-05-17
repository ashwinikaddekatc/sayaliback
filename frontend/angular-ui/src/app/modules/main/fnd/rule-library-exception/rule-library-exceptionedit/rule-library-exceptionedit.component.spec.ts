import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleLibraryExceptioneditComponent } from './rule-library-exceptionedit.component';

describe('RuleLibraryExceptioneditComponent', () => {
  let component: RuleLibraryExceptioneditComponent;
  let fixture: ComponentFixture<RuleLibraryExceptioneditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleLibraryExceptioneditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleLibraryExceptioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
