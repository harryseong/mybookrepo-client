import {Component, Input, OnInit} from '@angular/core';
import {BookDTO} from '../dto/dto.module';
import {BookService} from '../services/book/book.service';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBooksComponent implements OnInit {
  @Input() bookDTOArray: BookDTO[];
  @Input() bookCardType: string;

  viewBooksType = 'cards';

  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit() {
  }

  filterBooks(filterTerm: string) {
    this.bookService.filterBook(filterTerm);
  }

  viewTypeChange(viewType: string) {
    this.viewBooksType = viewType === 'cards' ? 'cards' : 'table';
  }
}
