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
    return title.length > 40 ? title.substr(0, 40).trim() + '.....' : title;
  }

  public abbreviateDescription = (description: string) => {
    return description.length > 150 ? description.substr(0, 150).trim() + '.....' : description;
  }
}
