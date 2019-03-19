import {Component, Inject, OnInit} from '@angular/core';
import {BookDTO} from '../../dto/dto.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {ResourcesApiService} from '../../services/api/resources/resources-api.service';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<BookDetailsDialogComponent>,
              private resourcesApiService: ResourcesApiService,
              private router: Router, public userService: UserService, private snackBarService: SnackBarService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addBook(bookDTO: BookDTO) {
    this.resourcesApiService.addBookToLibrary(bookDTO, this.userService.userDTO.id).subscribe(rsp => {
      console.log(rsp);
      this.resourcesApiService.bookAddedToLibrary(bookDTO);
      this.closeDialog();
    }, error1 => {
      console.error(error1);
    });
  }

  removeBook(bookDTO: BookDTO) {
    this.resourcesApiService.removeBookFromLibrary(bookDTO.id, this.userService.userDTO.id).subscribe(
      rsp => {
        console.log(rsp);
        this.resourcesApiService.bookRemovedFromLibrary(bookDTO);
        this.router.navigate(['/library/books']);
        this.closeDialog();
      },
      err => console.error(err)
    );
  }

  exploreAddBook(bookDTO: BookDTO) {
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
    this.resourcesApiService.$bookAddedEvent.next();
    this.closeDialog();
  }

  exploreRemoveBook(bookDTO: BookDTO) {
    const books: BookDTO[] = JSON.parse(localStorage.getItem('books'));
    const bookIndex = books.findIndex(x => x.title === bookDTO.title);
    books.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
    this.snackBarService.openSnackBar('"' + bookDTO._title + '" was removed from the library.', 'OK');
    this.resourcesApiService.$bookRemovedEvent.next();
    this.closeDialog();
  }

  abbreviateDescription = (description: string) => {
    return description.substr(0, 200).trim() + '.....';
  }
}
