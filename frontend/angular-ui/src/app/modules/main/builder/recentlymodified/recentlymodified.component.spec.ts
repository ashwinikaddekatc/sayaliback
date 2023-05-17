import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlymodifiedComponent } from './recentlymodified.component';

describe('RecentlymodifiedComponent', () => {
  let component: RecentlymodifiedComponent;
  let fixture: ComponentFixture<RecentlymodifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlymodifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlymodifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
