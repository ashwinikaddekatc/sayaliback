import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpipeComponent } from './addpipe.component';

describe('AddpipeComponent', () => {
  let component: AddpipeComponent;
  let fixture: ComponentFixture<AddpipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
