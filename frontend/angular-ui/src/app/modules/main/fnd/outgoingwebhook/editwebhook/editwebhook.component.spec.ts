import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditwebhookComponent } from './editwebhook.component';

describe('EditwebhookComponent', () => {
  let component: EditwebhookComponent;
  let fixture: ComponentFixture<EditwebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditwebhookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditwebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
