import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {DialogService} from '../../../../shared/services/dialog/dialog.service';
import {BookDTO} from '../../../../shared/dto/dto.module';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {ResourcesLibraryService} from '../../../../shared/services/api/resources/library/resources-library.service';
import {BookService} from '../../../../shared/services/book/book.service';
import {exploreSampleBooks} from '../../explore.sample-data';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {ResourcesPlanService} from '../../../../shared/services/api/resources/plan/resources-plan.service';
import {SnackBarService} from '../../../../shared/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-explore-reading-plan-search',
  templateUrl: './explore-reading-plan-search.component.html',
  styleUrls: ['./explore-reading-plan-search.component.scss'],
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
export class ExploreReadingPlanSearchComponent implements OnInit {
  bookDTOArray: any[] = [];
  bookAddedToPlan$: Subscription;
  isLoading = true;
  bookCardType = 'EXPLORE_PLAN_ADD';

  constructor(
    private bookService: BookService,
    private dialogService: DialogService,
    private resourcesPlanService: ResourcesPlanService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.getBooks();

    this.bookAddedToPlan$ = this.resourcesPlanService.bookAddedToPlanEvent$.subscribe(
      (bookDTO: BookDTO) => {
        this.snackBarService.openSnackBar('"' + bookDTO.title + '" was added to the plan.', 'OK');
      }
    );
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.leaveAddBook();
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

  openBookDetailsDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, 'EXPLORE_PLAN_ADD');
  }

  leaveAddBook() {
    this.router.navigate(['/explore/johndoe123/plan']);
  }
}
