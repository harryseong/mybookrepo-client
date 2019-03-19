import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookDTO} from '../../../shared/dto/dto.module';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {Subscription} from 'rxjs';
import {ResourcesApiService} from '../../../shared/services/api/resources/resources-api.service';

@Component({
  selector: 'app-explore-my-library',
  templateUrl: './explore-my-library.component.html',
  styleUrls: ['./explore-my-library.component.scss'],
  animations: [
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
export class ExploreMyLibraryComponent implements OnInit, OnDestroy {
  bookDTOArray: BookDTO[] = [];
  isLoading = true;
  bookRemoved$: Subscription;

  constructor(private dialogService: DialogService, private resourcesApiService: ResourcesApiService) { }

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
    const books: BookDTO[] = JSON.parse(localStorage.getItem('books'));
    if (books !== undefined && books !== null && books.length > 0) {
      this.bookDTOArray = books;
      this.isLoading = false;
    }
  }

  openDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, 'EXPLORE_VIEW');
  }
}
