import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlanDialogComponent } from './plan-dialog.component';

describe('PlanDialogComponent', () => {
  let component: PlanDialogComponent;
  let fixture: ComponentFixture<PlanDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
