import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappertableComponent } from './mappertable.component';

describe('MappertableComponent', () => {
  let component: MappertableComponent;
  let fixture: ComponentFixture<MappertableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappertableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
