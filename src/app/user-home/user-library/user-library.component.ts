import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {AuthorDTO, BookDTO, CategoryDTO} from '../../../shared/dto/dto.module';
import {UserService} from '../../../shared/services/user/user.service';
import {ResourcesLibraryService} from '../../../shared/services/api/resources/library/resources-library.service';
import {SnackBarService} from '../../../shared/services/snackBar/snack-bar.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.scss'],
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
export class UserLibraryComponent implements OnInit, OnDestroy {
  bookDTOArray: any[] = [];
  filteredBookDTOArray: any[] = [];
  isLoading = true;
  bookAdded$: Subscription;
  bookRemoved$: Subscription;

  @ViewChild('searchField') searchFieldRef: ElementRef;
  searchBookForm = new FormGroup({
    searchField: new FormControl('')
  });

  constructor(
    private dialogService: DialogService,
    public userService: UserService,
    private resourcesLibraryService: ResourcesLibraryService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.getBooks();

    this.bookAdded$ = this.resourcesLibraryService.bookAddedEvent$.subscribe(() => {
      this.bookDTOArray = [];
      this.getBooks();
    });

    this.bookRemoved$ = this.resourcesLibraryService.bookRemovedEvent$.subscribe((bookDTO) => {
      this.bookDTOArray = [];
      this.getBooks();
      this.snackBarService.openSnackBar('"' + bookDTO.title + '" was removed from the library.', 'OK');
    });
  }

  ngOnDestroy() {
    this.bookAdded$.unsubscribe();
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
    this.resourcesLibraryService.getAllBooks().subscribe(
      rsp => {
        this.bookDTOArray = rsp;
        this.filteredBookDTOArray = rsp;
        this.isLoading = false;
      }
    );
  }

  openDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, 'VIEW');
  }
}
