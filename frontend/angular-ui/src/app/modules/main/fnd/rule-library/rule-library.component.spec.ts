import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleLibraryComponent } from './rule-library.component';

describe('RuleLibraryComponent', () => {
  let component: RuleLibraryComponent;
  let fixture: ComponentFixture<RuleLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
