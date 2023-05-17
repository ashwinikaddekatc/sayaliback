import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbuilderaddComponent } from './listbuilderadd.component';

describe('ListbuilderaddComponent', () => {
  let component: ListbuilderaddComponent;
  let fixture: ComponentFixture<ListbuilderaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListbuilderaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbuilderaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
