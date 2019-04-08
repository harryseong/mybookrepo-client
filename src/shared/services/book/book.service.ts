import { Injectable } from '@angular/core';
import {AuthorDTO, CategoryDTO} from '../../dto/dto.module';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  filterBookEvent$ = new Subject<any>();

  constructor() { }

  filterBook(filterTerms: string) {
    this.filterBookEvent$.next(filterTerms);
  }

  authorsContain(authors: AuthorDTO[], filterTerms: string) {
    let foundAuthors = false;
    authors.map(author => {
      const authorFullName =
        (author.firstName !== null ? author.firstName + ' ' : '') +
        (author.middleName !== null ? author.middleName + ' ' : '') +
        (author.lastName !== null ? author.lastName : '');
      if (authorFullName.toLowerCase().trim().includes(filterTerms)) {
        foundAuthors = true;
      }
    });
    return foundAuthors;
  }

  categoriesContain(categories: CategoryDTO[], filterTerms: string) {
    let foundCategories = false;
    categories.map(category => {
      if (category.name.toLowerCase().trim().includes(filterTerms)) {
        foundCategories = true;
      }
    });
    return foundCategories;
  }
}
