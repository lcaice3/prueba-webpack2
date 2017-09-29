import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicNavComponent } from './basic-nav.component';

describe('BasicNavComponent', () => {
  let component: BasicNavComponent;
  let fixture: ComponentFixture<BasicNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
