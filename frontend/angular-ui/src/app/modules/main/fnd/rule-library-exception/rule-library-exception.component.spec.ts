import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleLibraryExceptionComponent } from './rule-library-exception.component';

describe('RuleLibraryExceptionComponent', () => {
  let component: RuleLibraryExceptionComponent;
  let fixture: ComponentFixture<RuleLibraryExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleLibraryExceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleLibraryExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
