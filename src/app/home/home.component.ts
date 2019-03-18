import { Component, OnInit } from '@angular/core';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('featureSummaryAnimations', [
      transition(':enter', [
        query('.feature', [
          style({ opacity: 0, transform: 'translateY(1em)'}),
          stagger(300, [
            sequence([
              animate('1s 0.5s ease', style({ opacity: 1, transform: 'translateY(0)' })),
            ])
          ]),
        ])
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
