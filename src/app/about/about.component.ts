import { Component, OnInit } from '@angular/core';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('contentAnimations', [
      transition(':enter', [
        query('.content-element', [
          style({ opacity: 0, transform: 'translateY(0.5em)'}),
          stagger(200, [
            sequence([
              animate('1s ease', style({ opacity: 1, transform: 'translateY(0)' })),
            ])
          ])
        ])
      ]),
    ])
  ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
