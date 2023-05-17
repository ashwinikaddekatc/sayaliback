import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorMappingComponent } from './connector-mapping.component';

describe('ConnectorMappingComponent', () => {
  let component: ConnectorMappingComponent;
  let fixture: ComponentFixture<ConnectorMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectorMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
