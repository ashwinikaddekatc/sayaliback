import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleLibraryallComponent } from './rule-libraryall.component';

describe('RuleLibraryallComponent', () => {
  let component: RuleLibraryallComponent;
  let fixture: ComponentFixture<RuleLibraryallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleLibraryallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleLibraryallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
