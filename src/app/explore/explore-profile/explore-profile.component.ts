import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-explore-profile',
  templateUrl: './explore-profile.component.html',
  styleUrls: ['./explore-profile.component.scss']
})
export class ExploreProfileComponent implements OnInit {

  constructor(public userSerivce: UserService) { }

  ngOnInit() {
  }

}
