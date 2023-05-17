import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyStackeditComponent } from './technology-stackedit.component';

describe('TechnologyStackeditComponent', () => {
  let component: TechnologyStackeditComponent;
  let fixture: ComponentFixture<TechnologyStackeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyStackeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyStackeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
