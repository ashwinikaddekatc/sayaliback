import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwebpageComponent } from './addwebpage.component';

describe('AddwebpageComponent', () => {
  let component: AddwebpageComponent;
  let fixture: ComponentFixture<AddwebpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddwebpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwebpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
