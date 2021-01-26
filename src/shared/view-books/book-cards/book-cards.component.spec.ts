import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookCardsComponent } from './book-cards.component';

describe('BookCardsComponent', () => {
  let component: BookCardsComponent;
  let fixture: ComponentFixture<BookCardsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
