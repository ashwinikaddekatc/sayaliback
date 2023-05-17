import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbWhereColumnSetupComponent } from './rb-where-column-setup.component';

describe('RbWhereColumnSetupComponent', () => {
  let component: RbWhereColumnSetupComponent;
  let fixture: ComponentFixture<RbWhereColumnSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbWhereColumnSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RbWhereColumnSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
