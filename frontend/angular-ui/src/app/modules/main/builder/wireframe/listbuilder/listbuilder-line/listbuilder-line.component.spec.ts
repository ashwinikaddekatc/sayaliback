import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbuilderLineComponent } from './listbuilder-line.component';

describe('ListbuilderLineComponent', () => {
  let component: ListbuilderLineComponent;
  let fixture: ComponentFixture<ListbuilderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListbuilderLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbuilderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
