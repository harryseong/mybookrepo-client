import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {BookDTO} from '../../dto/dto.module';
import {DialogService} from '../../services/dialog/dialog.service';
import {BookService} from '../../services/book/book.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
  animations: [
    trigger('bookTableAnimations', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(1em)'}),
        animate('0.5s ease'),
      ])
    ])
  ]
})
export class BookTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['cover', 'title', 'authors', 'categories'];
  dataSource: MatTableDataSource<any>;
  @Input() planId?: string;
  @Input() bookDTOArray: BookDTO[];
  @Input() bookCardType: string;
  filterEventSubscription$: Subscription;

  constructor(
    private dialogService: DialogService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.bookDTOArray);

    // Set custom filter predicate for searching nested fields of organization objects.
    this.dataSource.filterPredicate = (data, filter: string)  => {

      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();

      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.filterEventSubscription$ = this.bookService.filterBookEvent$.subscribe(
      (filterTerms: string) => {
        this.applyFilter(filterTerms);
      }
    );

    this.applyFilter('');
  }

  ngOnDestroy(): void {
    this.filterEventSubscription$.unsubscribe();
  }

  sortData(sort: Sort) {
    const data = this.bookDTOArray.slice();
    if (!sort.active || sort.direction === '') {
      this.bookDTOArray = data;
      return;
    }

    this.bookDTOArray = data.sort((a: BookDTO, b: BookDTO) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.bookDTOArray);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  openBookDetailsDialog(bookDTO: BookDTO): void {
    this.dialogService.openBookDetailsDialog(bookDTO, this.bookCardType, this.planId !== undefined ? this.planId : undefined);
  }
}
