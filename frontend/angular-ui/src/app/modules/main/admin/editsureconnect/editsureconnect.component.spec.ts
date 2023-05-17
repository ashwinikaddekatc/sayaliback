import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsureconnectComponent } from './editsureconnect.component';

describe('EditsureconnectComponent', () => {
  let component: EditsureconnectComponent;
  let fixture: ComponentFixture<EditsureconnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsureconnectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsureconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
