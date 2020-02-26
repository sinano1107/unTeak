import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusCardComponent } from './campus-card.component';

describe('CampusCardComponent', () => {
  let component: CampusCardComponent;
  let fixture: ComponentFixture<CampusCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
