import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickCampusComponent } from './pick-campus.component';

describe('PickCampusComponent', () => {
  let component: PickCampusComponent;
  let fixture: ComponentFixture<PickCampusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickCampusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
