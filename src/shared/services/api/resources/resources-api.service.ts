import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {BookDTO} from '../../../dto/dto.module';

@Injectable({
  providedIn: 'root'
})
export class ResourcesApiService {
  $bookAddedEvent = new Subject<any>();
  $bookRemovedEvent = new Subject<any>();
  $planCreatedEvent = new Subject<any>();
  $planRemovedEvent = new Subject<any>();

  constructor(private http: HttpClient) { }

  /**
   * Notify subscribers that book has been added to the library.
   * @param bookDTO
   */
  bookAddedToLibrary(bookDTO: BookDTO) {
    this.$bookAddedEvent.next(bookDTO);
  }

  /**
   * Notify subscribers that book has been removed from the library.
   * @param bookDTO
   */
  bookRemovedFromLibrary(bookDTO: BookDTO) {
    this.$bookRemovedEvent.next(bookDTO);
  }

  getAllBooks(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    const params = new HttpParams().set('userId', userId);
    return this.http.get(environment.api.resources_url + '/library/books', {params, headers});
  }

  /**
   * Adds book to user's library. Saves book, author, category to db as new entries if they do not yet exist in db.
   * @param bookDTO: BookDTO
   * @param userId
   */
  addBookToLibrary(bookDTO: BookDTO, userId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key),
    });
    const params = new HttpParams().set('userId', userId);
    return this.http.post(environment.api.resources_url + '/library/book', bookDTO, {params, headers, responseType: 'text'});
  }

  removeBookFromLibrary(bookId: string, userId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    const params = new HttpParams().set('bookId', bookId).set('userId', userId);
    return this.http.delete(environment.api.resources_url + '/library/book', {params, headers, responseType: 'text'});
  }
}
