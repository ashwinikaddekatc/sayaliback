import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbuilderallComponent } from './listbuilderall.component';

describe('ListbuilderallComponent', () => {
  let component: ListbuilderallComponent;
  let fixture: ComponentFixture<ListbuilderallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListbuilderallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbuilderallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
