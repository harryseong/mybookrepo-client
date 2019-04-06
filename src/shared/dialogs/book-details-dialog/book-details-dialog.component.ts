import {Component, Inject} from '@angular/core';
import {BookDTO} from '../../dto/dto.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {ResourcesLibraryService} from '../../services/api/resources/library/resources-library.service';
import {ResourcesPlanService} from '../../services/api/resources/plan/resources-plan.service';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<BookDetailsDialogComponent>,
              private resourcesLibraryService: ResourcesLibraryService,
              private resourcesPlanService: ResourcesPlanService,
              private router: Router,
              public userService: UserService,
              private snackBarService: SnackBarService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  addBookToLibrary(bookDTO: BookDTO) {
    this.resourcesLibraryService.addBookToLibrary(bookDTO).subscribe(() => {
      this.resourcesLibraryService.bookAddedToLibrary(bookDTO);
      this.closeDialog();
    },
      err => console.error(err)
    );
  }

  removeBookFromLibrary(bookDTO: BookDTO) {
    this.resourcesLibraryService.removeBookFromLibrary(bookDTO).subscribe(
      rsp => {
        this.resourcesLibraryService.bookRemovedFromLibrary(bookDTO);
        this.closeDialog();
      },
      err => console.error(err)
    );
  }

  addBookToPlan(planId: string, bookDTO: BookDTO) {
    this.resourcesPlanService.addBookToPlan(planId, bookDTO.id).subscribe(() => {
        this.resourcesPlanService.bookAddedToPlan(bookDTO);
        this.closeDialog();
      },
      err => console.error(err)
    );
  }

  exploreAddBookToLibrary(bookDTO: BookDTO) {
    let books: BookDTO[] = JSON.parse(localStorage.getItem('books'));
    if (books === null) {
      books = [];
      books.push(bookDTO);
      localStorage.setItem('books', JSON.stringify(books));
    } else {
      books.push(bookDTO);
      localStorage.setItem('books', JSON.stringify(books));
    }
    this.snackBarService.openSnackBar('"' + bookDTO.title + '" was added to the library.', 'OK');
    this.resourcesLibraryService.bookAddedEvent$.next();
    this.closeDialog();
  }

  exploreAddBookToPlan(planId: string, bookDTO: BookDTO) {
    this.resourcesPlanService.bookAddedToPlan(bookDTO);
    this.closeDialog();
  }

  exploreRemoveBookFromLibrary(bookDTO: BookDTO) {
    const books: BookDTO[] = JSON.parse(localStorage.getItem('books'));
    const bookIndex = books.findIndex(x => x.title === bookDTO.title);
    books.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
    this.snackBarService.openSnackBar('"' + bookDTO.title + '" was removed from the library.', 'OK');
    this.resourcesLibraryService.bookRemovedEvent$.next();
    this.closeDialog();
  }

  abbreviateDescription = (description: string) => {
    return description.substr(0, 200).trim() + '.....';
  }
}
