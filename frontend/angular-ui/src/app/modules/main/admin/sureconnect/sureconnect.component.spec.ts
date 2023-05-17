import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SureconnectComponent } from './sureconnect.component';

describe('SureconnectComponent', () => {
  let component: SureconnectComponent;
  let fixture: ComponentFixture<SureconnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SureconnectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SureconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
