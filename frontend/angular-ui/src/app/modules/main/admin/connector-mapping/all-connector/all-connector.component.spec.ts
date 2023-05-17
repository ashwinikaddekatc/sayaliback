import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllConnectorComponent } from './all-connector.component';

describe('AllConnectorComponent', () => {
  let component: AllConnectorComponent;
  let fixture: ComponentFixture<AllConnectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllConnectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
