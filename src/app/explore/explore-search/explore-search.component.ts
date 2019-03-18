import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookDTO} from '../../../shared/dto/dto.module';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-explore-search',
  templateUrl: './explore-search.component.html',
  styleUrls: ['./explore-search.component.scss']
})
export class ExploreSearchComponent implements OnInit {
  $bookAddedToLibrary: Subscription;
  searchBookForm = new FormGroup({
    searchField: new FormControl('')
  });
  prevSearchTerm = '';
  bookSearched = false;
  bookDTOArray: BookDTO[] = [];
  isLoading = true;
  @ViewChild('searchField') searchFieldRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }



}
