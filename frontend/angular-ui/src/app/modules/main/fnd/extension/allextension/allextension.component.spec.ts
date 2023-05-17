import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllextensionComponent } from './allextension.component';

describe('AllextensionComponent', () => {
  let component: AllextensionComponent;
  let fixture: ComponentFixture<AllextensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllextensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllextensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
