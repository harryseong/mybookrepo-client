import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  disableTooltip = false;

  constructor(
    public router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
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
