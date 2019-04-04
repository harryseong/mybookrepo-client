import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlanAddComponent } from './user-plan-add.component';

describe('UserPlanAddComponent', () => {
  let component: UserPlanAddComponent;
  let fixture: ComponentFixture<UserPlanAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPlanAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
