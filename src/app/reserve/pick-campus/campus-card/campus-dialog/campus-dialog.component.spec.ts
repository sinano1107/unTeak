import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusDialogComponent } from './campus-dialog.component';

describe('CampusDialogComponent', () => {
  let component: CampusDialogComponent;
  let fixture: ComponentFixture<CampusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
