import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorDTO, BookDTO, CategoryDTO} from '../../../shared/dto/dto.module';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {Subscription} from 'rxjs';
import {ResourcesLibraryService} from '../../../shared/services/api/resources/library/resources-library.service';
import {FormControl, FormGroup} from '@angular/forms';
import {exploreSampleBooks} from '../explore.sample-data';
import {SnackBarService} from '../../../shared/services/snackBar/snack-bar.service';

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
  ]
})
export class ExploreMyLibraryComponent implements OnInit, OnDestroy, AfterViewInit {
  bookDTOArray: any[] = [];
  isLoading = true;
  bookRemoved$: Subscription;
  bookCardType = 'EXPLORE_LIBRARY';

  constructor(
    private dialogService: DialogService,
    private resourcesLibraryService: ResourcesLibraryService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.getBooks();

    this.bookRemoved$ = this.resourcesLibraryService.bookRemovedEvent$.subscribe((bookDTO) => {
      this.bookDTOArray = [];
      this.isLoading = true;
      setTimeout(() => {
        this.getBooks();
      }, 50);
      this.snackBarService.openSnackBar('"' + bookDTO.title + '" was removed from the library.', 'OK');
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfFirstTime(), 50);
  }

  ngOnDestroy() {
    this.bookRemoved$.unsubscribe();
  }

  checkIfFirstTime() {
    const dsa: string = localStorage.getItem('dontShowAgain');
    if (dsa !== undefined && dsa !== null && dsa === 'true') {
      console.log('User opted not to be shown explore first time dialog.');
    } else {
      this.openExploreFirstTimeDialog();
    }
  }

  getBooks() {
    const books: BookDTO[] = JSON.parse(localStorage.getItem('books'));
    if (books !== undefined && books !== null && books.length > 0) {
      this.bookDTOArray = books;
      this.isLoading = false;
    } else {
      // Load default sample library.
      this.bookDTOArray = exploreSampleBooks;
      localStorage.setItem('books', JSON.stringify(exploreSampleBooks));
      this.isLoading = false;
    }
  }

  openExploreFirstTimeDialog() {
    this.dialogService.openExploreFirstTimeDialog();
  }
}
