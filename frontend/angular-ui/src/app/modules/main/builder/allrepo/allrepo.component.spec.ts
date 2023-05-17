import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrepoComponent } from './allrepo.component';

describe('AllrepoComponent', () => {
  let component: AllrepoComponent;
  let fixture: ComponentFixture<AllrepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllrepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllrepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
