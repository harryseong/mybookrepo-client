import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  constructor(
              public router: Router,
              public userService: UserService
  ) {}

  ngOnInit() {
  }
}
