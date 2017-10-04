import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrontComponent } from './confront.component';

describe('ConfrontComponent', () => {
  let component: ConfrontComponent;
  let fixture: ComponentFixture<ConfrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
