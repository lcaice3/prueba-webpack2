import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorNavComponent } from './simulator-nav.component';

describe('SimulatorNavComponent', () => {
  let component: SimulatorNavComponent;
  let fixture: ComponentFixture<SimulatorNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
