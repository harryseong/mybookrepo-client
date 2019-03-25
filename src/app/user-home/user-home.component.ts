import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

}
