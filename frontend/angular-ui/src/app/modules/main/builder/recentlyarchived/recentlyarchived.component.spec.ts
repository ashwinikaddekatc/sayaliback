import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyarchivedComponent } from './recentlyarchived.component';

describe('RecentlyarchivedComponent', () => {
  let component: RecentlyarchivedComponent;
  let fixture: ComponentFixture<RecentlyarchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyarchivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyarchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
