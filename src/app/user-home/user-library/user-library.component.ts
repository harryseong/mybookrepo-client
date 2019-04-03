import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {ResourcesApiService} from '../../../shared/services/api/resources/resources-api.service';
import {BookDTO} from '../../../shared/dto/dto.module';
import {UserService} from '../../../shared/services/user/user.service';

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
  isLoading = true;
  bookRemoved$: Subscription;

  constructor(
    private dialogService: DialogService,
    private resourcesApiService: ResourcesApiService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.getBooks();
    this.bookRemoved$ = this.resourcesApiService.$bookRemovedEvent.subscribe(() => {
      this.bookDTOArray = [];
      this.getBooks();
    });
  }

  ngOnDestroy() {
    this.bookRemoved$.unsubscribe();
  }

  getBooks() {
    this.resourcesApiService.getAllBooks().subscribe(
      rsp => {
        this.bookDTOArray = rsp;
        this.isLoading = false;
      }
    );
  }

  openDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, 'VIEW');
  }
}
