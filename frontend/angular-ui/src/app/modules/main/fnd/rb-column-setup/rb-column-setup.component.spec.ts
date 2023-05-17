import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbColumnSetupComponent } from './rb-column-setup.component';

describe('RbColumnSetupComponent', () => {
  let component: RbColumnSetupComponent;
  let fixture: ComponentFixture<RbColumnSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbColumnSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbColumnSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
