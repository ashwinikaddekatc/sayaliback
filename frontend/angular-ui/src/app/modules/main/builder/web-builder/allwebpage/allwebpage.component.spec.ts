import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllwebpageComponent } from './allwebpage.component';

describe('AllwebpageComponent', () => {
  let component: AllwebpageComponent;
  let fixture: ComponentFixture<AllwebpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllwebpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllwebpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
