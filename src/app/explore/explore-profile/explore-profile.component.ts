import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user/user.service';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-explore-profile',
  templateUrl: './explore-profile.component.html',
  styleUrls: ['./explore-profile.component.scss'],
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
export class ExploreProfileComponent implements OnInit {

  constructor(public userSerivce: UserService) { }

  ngOnInit() {
  }

}
