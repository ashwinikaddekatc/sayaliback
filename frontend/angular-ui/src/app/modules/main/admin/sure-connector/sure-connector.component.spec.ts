import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureConnectorComponent } from './sure-connector.component';

describe('SureConnectorComponent', () => {
  let component: SureConnectorComponent;
  let fixture: ComponentFixture<SureConnectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureConnectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
