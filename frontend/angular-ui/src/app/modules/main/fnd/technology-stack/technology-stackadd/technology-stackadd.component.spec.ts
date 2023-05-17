import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyStackaddComponent } from './technology-stackadd.component';

describe('TechnologyStackaddComponent', () => {
  let component: TechnologyStackaddComponent;
  let fixture: ComponentFixture<TechnologyStackaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyStackaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyStackaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
