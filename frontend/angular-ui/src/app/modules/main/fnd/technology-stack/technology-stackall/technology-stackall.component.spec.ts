import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyStackallComponent } from './technology-stackall.component';

describe('TechnologyStackallComponent', () => {
  let component: TechnologyStackallComponent;
  let fixture: ComponentFixture<TechnologyStackallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyStackallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyStackallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
