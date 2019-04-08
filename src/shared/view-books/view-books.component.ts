import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BookDTO} from '../dto/dto.module';
import {BookService} from '../services/book/book.service';
import {UserService} from '../services/user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBooksComponent implements OnInit, OnDestroy {
  @Input() planId?: string;
  @Input() bookDTOArray: BookDTO[];
  @Input() bookCardType: string;
  viewBooksTypeChange$: Subscription;
  viewBooksType = '';

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.viewBooksType = this.userService.viewBooksType;
    this.viewBooksTypeChange$ = this.userService.viewBooksTypeChangeEvent$.subscribe(
      viewType => this.viewBooksType = viewType
    );
  }

  ngOnDestroy(): void {
    this.viewBooksTypeChange$.unsubscribe();
  }

  filterBooks(filterTerm: string) {
    this.bookService.filterBook(filterTerm);
  }

  viewTypeChange(viewType: string) {
    this.userService.viewTypeChange(viewType);
  }
}
