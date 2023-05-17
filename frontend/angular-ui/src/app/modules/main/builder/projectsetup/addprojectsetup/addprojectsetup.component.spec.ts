import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprojectsetupComponent } from './addprojectsetup.component';

describe('AddprojectsetupComponent', () => {
  let component: AddprojectsetupComponent;
  let fixture: ComponentFixture<AddprojectsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprojectsetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprojectsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
