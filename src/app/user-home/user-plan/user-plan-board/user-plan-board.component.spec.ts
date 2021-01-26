import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserPlanBoardComponent } from './user-plan-board.component';

describe('UserPlanBoardComponent', () => {
  let component: UserPlanBoardComponent;
  let fixture: ComponentFixture<UserPlanBoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPlanBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
