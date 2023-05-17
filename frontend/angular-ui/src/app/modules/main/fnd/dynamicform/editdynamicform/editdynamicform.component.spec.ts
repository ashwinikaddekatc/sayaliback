import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdynamicformComponent } from './editdynamicform.component';

describe('EditdynamicformComponent', () => {
  let component: EditdynamicformComponent;
  let fixture: ComponentFixture<EditdynamicformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdynamicformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdynamicformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
