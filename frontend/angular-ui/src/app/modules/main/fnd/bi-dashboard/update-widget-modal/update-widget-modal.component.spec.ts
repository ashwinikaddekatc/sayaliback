import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWidgetModalComponent } from './update-widget-modal.component';

describe('UpdateWidgetModalComponent', () => {
  let component: UpdateWidgetModalComponent;
  let fixture: ComponentFixture<UpdateWidgetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWidgetModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWidgetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
