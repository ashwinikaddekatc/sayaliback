import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbTableSetupComponent } from './rb-table-setup.component';

describe('RbTableSetupComponent', () => {
  let component: RbTableSetupComponent;
  let fixture: ComponentFixture<RbTableSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbTableSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbTableSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
