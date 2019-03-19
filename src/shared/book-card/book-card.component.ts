import {Component, Input, OnInit} from '@angular/core';
import {BookDTO} from '../dto/dto.module';
import {DialogService} from '../services/dialog/dialog.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() bookDTO: BookDTO;

  constructor() { }

  ngOnInit() {}

  public abbreviateTitle = (title: string) => {
    return title.length > 60 ? title.substr(0, 60).trim() + '.....' : title;
  }

  public abbreviateDescription = (description: string) => {
    return description.length > 180 ? description.substr(0, 180).trim() + '.....' : description;
  }
}
