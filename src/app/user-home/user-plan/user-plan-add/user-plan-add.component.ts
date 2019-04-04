import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {BookDTO, PlanDTO} from '../../../../shared/dto/dto.module';
import {SnackBarService} from '../../../../shared/services/snackBar/snack-bar.service';
import {ResourcesLibraryService} from '../../../../shared/services/api/resources/library/resources-library.service';
import {DialogService} from '../../../../shared/services/dialog/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../shared/services/user/user.service';

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
  isLoading = true;
  bookAdded$: Subscription;
  bookRemoved$: Subscription;
  currentPlanId: string;

  constructor(
    private dialogService: DialogService,
    public userService: UserService,
    private resourcesLibraryService: ResourcesLibraryService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => this.currentPlanId = params.get('planId')
    );

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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.leaveAddBook();
    }
  }

  getBooks() {
    this.resourcesLibraryService.getAllBooks().subscribe(
      rsp => {
        this.bookDTOArray = rsp;
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
