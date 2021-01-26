import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgressSpinnerComponent } from './progress-spinner.component';

describe('ProgressSpinnerComponent', () => {
  let component: ProgressSpinnerComponent;
  let fixture: ComponentFixture<ProgressSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
