import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllprojectcardComponent } from './allprojectcard.component';

describe('AllprojectcardComponent', () => {
  let component: AllprojectcardComponent;
  let fixture: ComponentFixture<AllprojectcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllprojectcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllprojectcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
