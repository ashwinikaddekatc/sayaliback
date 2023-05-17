import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireframeCardComponent } from './wireframe-card.component';

describe('WireframeCardComponent', () => {
  let component: WireframeCardComponent;
  let fixture: ComponentFixture<WireframeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WireframeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WireframeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
