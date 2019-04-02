import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  options: FormGroup;
  disableTooltip = false;

  constructor(fb: FormBuilder,
              public router: Router,
              private breakpointObserver: BreakpointObserver,
              public userService: UserService) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });

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
