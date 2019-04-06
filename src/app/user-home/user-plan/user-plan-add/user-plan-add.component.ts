import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {BookDTO, PlanDTO} from '../../../../shared/dto/dto.module';
import {SnackBarService} from '../../../../shared/services/snackBar/snack-bar.service';
import {ResourcesLibraryService} from '../../../../shared/services/api/resources/library/resources-library.service';
import {DialogService} from '../../../../shared/services/dialog/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../shared/services/user/user.service';
import {ResourcesPlanService} from '../../../../shared/services/api/resources/plan/resources-plan.service';
import {FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../../../../shared/services/book/book.service';

@Component({
  selector: 'app-user-plan-add',
  templateUrl: './user-plan-add.component.html',
  styleUrls: ['./user-plan-add.component.scss'],
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
export class UserPlanAddComponent implements OnInit, OnDestroy {
  bookDTOArray: any[] = [];
  filteredBookDTOArray: any[] = [];
  isLoading = true;
  bookAddedToPlan$: Subscription;
  currentPlanId: string;

  @ViewChild('searchField') searchFieldRef: ElementRef;
  searchBookForm = new FormGroup({
    searchField: new FormControl('')
  });

  constructor(
    private bookService: BookService,
    private dialogService: DialogService,
    public userService: UserService,
    private resourcesLibraryService: ResourcesLibraryService,
    private resourcesPlanService: ResourcesPlanService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => this.currentPlanId = params.get('planId')
    );

    this.bookAddedToPlan$ = this.resourcesPlanService.bookAddedToPlanEvent$.subscribe(
    (bookDTO: BookDTO) => {
        this.snackBarService.openSnackBar('"' + bookDTO.title + '" was added to the plan.', 'OK');
      }
    );

    this.getBooks();
  }

  ngOnDestroy() {
    this.bookAddedToPlan$.unsubscribe();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.leaveAddBook();
    }
  }

  search() {
    const searchTerm: string = this.searchBookForm.get('searchField').value.trim().toLowerCase();

    console.log(searchTerm);

    if (searchTerm !== '') {
      this.filteredBookDTOArray = this.bookDTOArray.filter(bookDTO =>
        bookDTO.title.trim().toLowerCase().includes(searchTerm) ||
        this.bookService.authorsContain(bookDTO.authors, searchTerm) ||
        this.bookService.categoriesContain(bookDTO.categories, searchTerm)
      );
    } else {
      this.filteredBookDTOArray = this.bookDTOArray;
    }
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

  openDialog(planId: string, bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, 'PLAN_ADD', planId);
  }

  leaveAddBook() {
    this.router.navigate(['/user', this.userService.username, 'plan', this.currentPlanId]);
  }
}
