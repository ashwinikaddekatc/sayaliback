import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyelementComponent } from './technologyelement.component';

describe('TechnologyelementComponent', () => {
  let component: TechnologyelementComponent;
  let fixture: ComponentFixture<TechnologyelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyelementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
