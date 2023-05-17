import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldynamicformComponent } from './alldynamicform.component';

describe('AlldynamicformComponent', () => {
  let component: AlldynamicformComponent;
  let fixture: ComponentFixture<AlldynamicformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlldynamicformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldynamicformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
