import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  isExplore: boolean;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.checkAccessToken();
  }

  logout() {
    this.userService.logout();
  }
}
