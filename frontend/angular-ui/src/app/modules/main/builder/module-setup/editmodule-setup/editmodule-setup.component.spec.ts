import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmoduleSetupComponent } from './editmodule-setup.component';

describe('EditmoduleSetupComponent', () => {
  let component: EditmoduleSetupComponent;
  let fixture: ComponentFixture<EditmoduleSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmoduleSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmoduleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
