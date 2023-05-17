import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddynamicformComponent } from './adddynamicform.component';

describe('AdddynamicformComponent', () => {
  let component: AdddynamicformComponent;
  let fixture: ComponentFixture<AdddynamicformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddynamicformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddynamicformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
