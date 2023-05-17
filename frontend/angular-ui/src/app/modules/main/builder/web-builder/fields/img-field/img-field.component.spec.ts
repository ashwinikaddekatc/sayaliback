import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgFieldComponent } from './img-field.component';

describe('ImgFieldComponent', () => {
  let component: ImgFieldComponent;
  let fixture: ComponentFixture<ImgFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
