import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorDTO, BookDTO, CategoryDTO} from '../../dto/dto.module';
import {FormControl, FormGroup} from '@angular/forms';
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
        this.authorsContain(bookDTO.authors, filterTerms) ||
        this.categoriesContain(bookDTO.categories, filterTerms)
      );
    } else {
      this.filteredBookDTOArray = this.bookDTOArray;
    }
  }

  authorsContain(authors: AuthorDTO[], searchTerm: string) {
    let foundAuthors = false;
    authors.map(author => {
      const authorFullName =
        (author.firstName !== null ? author.firstName + ' ' : '') +
        (author.middleName !== null ? author.middleName + ' ' : '') +
        (author.lastName !== null ? author.lastName : '');
      if (authorFullName.toLowerCase().trim().includes(searchTerm)) {
        foundAuthors = true;
      }
    });
    return foundAuthors;
  }

  categoriesContain(categories: CategoryDTO[], searchTerm: string) {
    let foundCategories = false;
    categories.map(category => {
      if (category.name.toLowerCase().trim().includes(searchTerm)) {
        foundCategories = true;
      }
    });
    return foundCategories;
  }

  openBookDetailsDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, this.bookCardType);
  }
}
