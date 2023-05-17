import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleLibraryaddComponent } from './rule-libraryadd.component';

describe('RuleLibraryaddComponent', () => {
  let component: RuleLibraryaddComponent;
  let fixture: ComponentFixture<RuleLibraryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleLibraryaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleLibraryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
