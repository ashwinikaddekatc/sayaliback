import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditwebpageComponent } from './editwebpage.component';

describe('EditwebpageComponent', () => {
  let component: EditwebpageComponent;
  let fixture: ComponentFixture<EditwebpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditwebpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditwebpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
