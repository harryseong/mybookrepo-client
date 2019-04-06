import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorDTO, BookDTO, CategoryDTO} from '../../../shared/dto/dto.module';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {Subscription} from 'rxjs';
import {ResourcesLibraryService} from '../../../shared/services/api/resources/library/resources-library.service';
import {FormControl, FormGroup} from '@angular/forms';
import {exploreSampleBooks} from '../explore.sample-data';

@Component({
  selector: 'app-explore-my-library',
  templateUrl: './explore-my-library.component.html',
  styleUrls: ['./explore-my-library.component.scss'],
  animations: [
    trigger('contentAnimations', [
      transition(':enter', [
        query('.content-element', [
          style({ opacity: 0, transform: 'translateY(1em)'}),
          stagger(100, [
            sequence([
              animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' })),
            ])
          ])
        ])
      ]),
    ]),
    trigger('bookCardAnimations', [
      transition(':enter', [
        query('.book-card', [
          style({ opacity: 0, transform: 'translateY(1em)'}),
          stagger(100, [
            sequence([
              animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' })),
            ])
          ])
        ], {optional: true})
      ]),
    ])
  ]
})
export class ExploreMyLibraryComponent implements OnInit, OnDestroy, AfterViewInit {
  bookDTOArray: any[] = [];
  filteredBookDTOArray: any[] = [];
  isLoading = true;
  bookRemoved$: Subscription;

  @ViewChild('searchField') searchFieldRef: ElementRef;
  searchBookForm = new FormGroup({
    searchField: new FormControl('')
  });

  constructor(
    private dialogService: DialogService,
    private resourcesLibraryService: ResourcesLibraryService) { }

  ngOnInit() {
    this.getBooks();
    this.bookRemoved$ = this.resourcesLibraryService.bookRemovedEvent$.subscribe(() => {
      this.bookDTOArray = [];
      this.getBooks();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfFirstTime(), 200);
  }

  checkIfFirstTime() {
    const dsa: string = localStorage.getItem('dontShowAgain');
    if (dsa !== undefined && dsa !== null && dsa === 'true') {
      console.log('User opted not to be shown explore first time dialog.');
    } else {
      this.openExploreFirstTimeDialog();
    }
  }

  ngOnDestroy() {
    this.bookRemoved$.unsubscribe();
  }

  search() {
    const searchTerm: string = this.searchBookForm.get('searchField').value.trim().toLowerCase();

    console.log(searchTerm);

    if (searchTerm !== '') {
      this.filteredBookDTOArray = this.bookDTOArray.filter(bookDTO =>
        bookDTO.title.trim().toLowerCase().includes(searchTerm) ||
        this.authorsContain(bookDTO.authors, searchTerm) ||
        this.categoriesContain(bookDTO.categories, searchTerm)
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

  getBooks() {
    const books: BookDTO[] = JSON.parse(localStorage.getItem('books'));
    if (books !== undefined && books !== null && books.length > 0) {
      this.bookDTOArray = books;
      this.filteredBookDTOArray = books;
      this.isLoading = false;
    } else {
      // Load default sample library.
      this.bookDTOArray = exploreSampleBooks;
      this.filteredBookDTOArray = exploreSampleBooks;
      localStorage.setItem('books', JSON.stringify(exploreSampleBooks));
      this.isLoading = false;
    }
  }

  openDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, 'EXPLORE_VIEW');
  }

  openExploreFirstTimeDialog() {
    this.dialogService.openExploreFirstTimeDialog();
  }
}
