import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user/user.service';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  disableTooltip = false;

  constructor(
              public router: Router,
              private breakpointObserver: BreakpointObserver,
              public userService: UserService) {
    // Enable nav tooltip only if screen size is "sm"
    breakpointObserver.observe([
      Breakpoints.Small
    ]).subscribe(result => {
      if (result.matches === true) {
        this.disableTooltip = false;
      } else {
        this.disableTooltip = true;
      }
    });
  }

  ngOnInit() {
  }
}
