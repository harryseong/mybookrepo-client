import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookTableComponent } from './book-table.component';

describe('BookTableComponent', () => {
  let component: BookTableComponent;
  let fixture: ComponentFixture<BookTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
