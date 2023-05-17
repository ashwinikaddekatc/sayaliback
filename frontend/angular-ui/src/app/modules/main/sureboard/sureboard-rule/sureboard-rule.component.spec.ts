import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureboardRuleComponent } from './sureboard-rule.component';

describe('SureboardRuleComponent', () => {
  let component: SureboardRuleComponent;
  let fixture: ComponentFixture<SureboardRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureboardRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureboardRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
