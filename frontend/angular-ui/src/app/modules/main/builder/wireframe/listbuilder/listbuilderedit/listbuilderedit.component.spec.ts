import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbuildereditComponent } from './listbuilderedit.component';

describe('ListbuildereditComponent', () => {
  let component: ListbuildereditComponent;
  let fixture: ComponentFixture<ListbuildereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListbuildereditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbuildereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
