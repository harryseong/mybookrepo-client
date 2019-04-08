import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BookDTO} from '../../dto/dto.module';
import {DialogService} from '../../services/dialog/dialog.service';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {BookService} from '../../services/book/book.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book-cards',
  templateUrl: './book-cards.component.html',
  styleUrls: ['./book-cards.component.scss'],
  animations: [
    trigger('bookCardAnimations', [
      transition(':enter', [
        query('.book-card', [
          style({ opacity: 0, transform: 'translateY(1em)'}),
          stagger(30, [
            sequence([
              animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' })),
            ])
          ])
        ], {optional: true})
      ]),
    ])
  ]
})
export class BookCardsComponent implements OnInit, OnDestroy {
  @Input() bookDTOArray: any[];
  @Input() bookCardType: string;
  filteredBookDTOArray: any[] = [];
  filterEventSubscription$: Subscription;

  constructor(
    private dialogService: DialogService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.filteredBookDTOArray = this.bookDTOArray;

    this.filterEventSubscription$ = this.bookService.filterBookEvent$.subscribe(
      (filterTerms: string) => {
        this.applyFilter(filterTerms);
      }
    );
  }

  ngOnDestroy(): void {
    this.filterEventSubscription$.unsubscribe();
  }

  applyFilter(filterTerms: string) {
    if (filterTerms !== '') {
      this.filteredBookDTOArray = this.bookDTOArray.filter(bookDTO =>
        bookDTO.title.trim().toLowerCase().includes(filterTerms) ||
        (bookDTO.authors !== undefined && bookDTO.authors !== null ? this.bookService.authorsContain(bookDTO.authors, filterTerms) : false) ||
        (bookDTO.categories !== undefined && bookDTO.categories !== null ? this.bookService.categoriesContain(bookDTO.categories, filterTerms) : false)
      );
    } else {
      this.filteredBookDTOArray = this.bookDTOArray;
    }
  }

  openBookDetailsDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, this.bookCardType);
  }
}
