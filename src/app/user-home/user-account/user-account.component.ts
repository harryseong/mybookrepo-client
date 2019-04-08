import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user/user.service';
import {BookDTO} from '../../../shared/dto/dto.module';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {ResourcesLibraryService} from '../../../shared/services/api/resources/library/resources-library.service';
import {DialogService} from '../../../shared/services/dialog/dialog.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
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
  ])
]
})
export class UserAccountComponent implements OnInit {
  libraryBookCount: number;
  isLoading = true;

  constructor(
    public userService: UserService,
    private resourcesLibraryService: ResourcesLibraryService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.resourcesLibraryService.getAllBooks().subscribe(
      rsp => {
        this.libraryBookCount = rsp.length;
        this.isLoading = false;
      }
    );
  }

  openGravatarDialog() {
    this.dialogService.openGravatarDialog();
  }
}
