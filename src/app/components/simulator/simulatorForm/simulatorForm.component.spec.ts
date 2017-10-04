import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorFormComponent } from './simulatorForm.component';

describe('SimulatorComponent', () => {
  let component: SimulatorFormComponent;
  let fixture: ComponentFixture<SimulatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
