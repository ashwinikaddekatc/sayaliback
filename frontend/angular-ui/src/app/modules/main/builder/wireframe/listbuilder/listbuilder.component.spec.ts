import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbuilderComponent } from './listbuilder.component';

describe('ListbuilderComponent', () => {
  let component: ListbuilderComponent;
  let fixture: ComponentFixture<ListbuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListbuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
