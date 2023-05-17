import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationReleaseComponent } from './iteration-release.component';

describe('IterationReleaseComponent', () => {
  let component: IterationReleaseComponent;
  let fixture: ComponentFixture<IterationReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IterationReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
