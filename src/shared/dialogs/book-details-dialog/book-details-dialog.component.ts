import {Component, Inject, OnInit} from '@angular/core';
import {BookDTO} from '../../dto/dto.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {ResourcesApiService} from '../../services/api/resources/resources-api.service';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<BookDetailsDialogComponent>,
              private resourcesApiService: ResourcesApiService,
              private router: Router, public userService: UserService,
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

  removeBook(book) {
    this.resourcesApiService.removeBookFromLibrary(book.id, this.userService.userDTO.id).subscribe(
      rsp => {
        console.log(rsp);
        this.resourcesApiService.bookRemovedFromLibrary(book);
        this.router.navigate(['/library/books']);
        this.closeDialog();
      },
      err => console.error(err)
    );
  }

  abbreviateDescription = (description: string) => {
    return description.substr(0, 200).trim() + '.....';
  }
}
