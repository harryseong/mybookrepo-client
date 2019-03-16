import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksApiService {

  constructor(private http: HttpClient) { }

  lookupBooksByTitle(title: string) {
    return this.http.get(environment.api.goole_books_url + '?q=title:' + title);
  }
  lookupBooksByAuthor(author: string) {
    return this.http.get(environment.api.goole_books_url + '?q=author:' + author);
  }
  lookupBooksByIsbn13(isbn13: string) {
    return this.http.get(environment.api.goole_books_url + '?q=isbn:' + isbn13);
  }
}
