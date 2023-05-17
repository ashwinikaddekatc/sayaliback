import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllprojectsetupComponent } from './allprojectsetup.component';

describe('AllprojectsetupComponent', () => {
  let component: AllprojectsetupComponent;
  let fixture: ComponentFixture<AllprojectsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllprojectsetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllprojectsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
