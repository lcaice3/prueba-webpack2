import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDuccComponent } from './modal-ducc.component';

describe('ModalDuccComponent', () => {
  let component: ModalDuccComponent;
  let fixture: ComponentFixture<ModalDuccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDuccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDuccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
