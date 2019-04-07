import { Injectable } from '@angular/core';
import {AuthorDTO, CategoryDTO} from '../../dto/dto.module';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  filterBookEvent$ = new Subject<any>();

  constructor() { }

  filterBook(filterTerm: string) {
    this.filterBookEvent$.next(filterTerm);
  }

  authorsContain(authors: AuthorDTO[], searchTerm: string) {
    let foundAuthors = false;
    authors.map(author => {
      const authorFullName =
        (author.firstName !== null ? author.firstName + ' ' : '') +
        (author.middleName !== null ? author.middleName + ' ' : '') +
        (author.lastName !== null ? author.lastName : '');
      if (authorFullName.toLowerCase().trim().includes(searchTerm)) {
        foundAuthors = true;
      }
    });
    return foundAuthors;
  }

  categoriesContain(categories: CategoryDTO[], searchTerm: string) {
    let foundCategories = false;
    categories.map(category => {
      if (category.name.toLowerCase().trim().includes(searchTerm)) {
        foundCategories = true;
      }
    });
    return foundCategories;
  }
}
