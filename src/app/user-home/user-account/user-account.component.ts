import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user/user.service';
import {BookDTO} from '../../../shared/dto/dto.module';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';

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
  bookDTOArray: any[] = [];
  isLoading = true;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {}
}
