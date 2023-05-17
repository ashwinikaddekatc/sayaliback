import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleLibraryeditComponent } from './rule-libraryedit.component';

describe('RuleLibraryeditComponent', () => {
  let component: RuleLibraryeditComponent;
  let fixture: ComponentFixture<RuleLibraryeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleLibraryeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleLibraryeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
