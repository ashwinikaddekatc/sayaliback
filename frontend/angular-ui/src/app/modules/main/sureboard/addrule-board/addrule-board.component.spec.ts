import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddruleBoardComponent } from './addrule-board.component';

describe('AddruleBoardComponent', () => {
  let component: AddruleBoardComponent;
  let fixture: ComponentFixture<AddruleBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddruleBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddruleBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
