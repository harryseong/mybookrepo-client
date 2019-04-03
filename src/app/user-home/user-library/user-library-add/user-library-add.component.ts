import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {BookDTO} from '../../../../shared/dto/dto.module';
import {SnackBarService} from '../../../../shared/services/snackBar/snack-bar.service';
import {GoogleBooksApiService} from '../../../../shared/services/api/google-books/google-books-api.service';
import {ResourcesApiService} from '../../../../shared/services/api/resources/resources-api.service';
import {DialogService} from '../../../../shared/services/dialog/dialog.service';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {UserService} from '../../../../shared/services/user/user.service';
import {Router} from '@angular/router';
import {ResourcesLibraryService} from '../../../../shared/services/api/resources/library/resources-library.service';

@Component({
  selector: 'app-user-library-add',
  templateUrl: './user-library-add.component.html',
  styleUrls: ['./user-library-add.component.scss'],
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
export class UserLibraryAddComponent implements OnInit, OnDestroy {
  searchBooks$: Subscription;
  bookAddedToLibrary$: Subscription;
  searchBookForm = new FormGroup({
    searchField: new FormControl('')
  });
  prevSearchTerm = '';
  bookSearched = false;
  bookDTOArray: BookDTO[] = [];
  isLoading = true;
  @ViewChild('searchField') searchFieldRef: ElementRef;

  constructor(private snackBarService: SnackBarService,
              private googleBooksApiService: GoogleBooksApiService,
              private resourcesApiService: ResourcesApiService,
              private resourcesLibraryService: ResourcesLibraryService,
              private dialogService: DialogService,
              private router: Router,
              public userService: UserService
  ) { }

  ngOnInit() {
    this.bookAddedToLibrary$ = this.resourcesLibraryService.bookAddedEvent$.subscribe(
      (bookDTO: BookDTO) => this.snackBarService.openSnackBar('"' + bookDTO.title + '" was added to the library.', 'OK')
  );
  }

  ngOnDestroy(): void {
    if (this.searchBooks$ != null) {
      this.searchBooks$.unsubscribe();
    }

    if (this.bookAddedToLibrary$ != null) {
      this.bookAddedToLibrary$.unsubscribe();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.leaveAddBook();
    }
  }

  searchBooks() {
    this.bookDTOArray = [];
    this.bookSearched = true;
    this.isLoading = true;
    this.prevSearchTerm = this.searchBookForm.get('searchField').value;
    this.searchFieldRef.nativeElement.blur();

    if (this.isISBN(this.prevSearchTerm)) {
      console.log('Search term identified as ISBN number');
      this.lookupBooksByISBN13(this.prevSearchTerm);
    } else {
      console.log('Search term not an ISBN number');
      this.lookupBooksByTitle(this.prevSearchTerm);
      this.lookupBooksByAuthor(this.prevSearchTerm);
    }
  }

  isISBN(searchTerms: string) {
    return /^(97(8|9))?\d{9}(\d|X)$/.test(searchTerms);
  }

  lookupBooksByTitle(searchTerms: string) {
    this.searchBooks$ = this.googleBooksApiService.lookupBooksByTitle(searchTerms).subscribe(data => {
      this.processGoogleBooksApiResponse(data);
    });
  }

  lookupBooksByAuthor(searchTerms: string) {
    this.searchBooks$ = this.googleBooksApiService.lookupBooksByAuthor(searchTerms).subscribe(data => {
      this.processGoogleBooksApiResponse(data);
    });
  }

  lookupBooksByISBN13(searchTerms: string) {
    this.searchBooks$ = this.googleBooksApiService.lookupBooksByIsbn13(searchTerms).subscribe(data => {
      this.processGoogleBooksApiResponse(data);
    });
  }

  processGoogleBooksApiResponse(data: any) {
    const dataObj: any = data;
    const totalItems = dataObj.totalItems;
    if (totalItems > 0) {
      dataObj.items.slice(0, 10).map(item => {
        const bookDTO = new BookDTO(item.volumeInfo);
        console.log('BookDTO: ', bookDTO);
        this.bookDTOArray.push(bookDTO);
      });
      console.log('BookDTOArray: ', this.bookDTOArray);
      console.log(totalItems + ' book items returned from API call.');
    } else {
      console.log(totalItems + ' book items returned from API call.');
    }
    this.isLoading = false;
    this.clearSubscriptions();
    this.clearLookupBookForm();
  }

  clearSubscriptions() {
    if (this.searchBooks$ != null) {
      this.searchBooks$.unsubscribe();
      this.searchBooks$ = null;
    }
  }

  clearLookupBookForm() {
    this.searchBookForm.get('searchField').reset();
    this.searchBookForm.clearValidators();
  }

  openDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, 'NEW');
  }

  leaveAddBook() {
    this.router.navigate(['/user', this.userService.username, 'library']);
  }
}
