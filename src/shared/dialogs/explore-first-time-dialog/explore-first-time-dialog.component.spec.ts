import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExploreFirstTimeDialogComponent } from './explore-first-time-dialog.component';

describe('ExploreFirstTimeDialogComponent', () => {
  let component: ExploreFirstTimeDialogComponent;
  let fixture: ComponentFixture<ExploreFirstTimeDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreFirstTimeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreFirstTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
