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
  $planUpdatedEvent = new Subject<any>();
  $planDeletedEvent = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    return this.http.get(environment.api.resources_url + '/user', {headers});
  }

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

  getAllBooks(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    return this.http.get(environment.api.resources_url + '/library/books', {headers});
  }

  /**
   * Adds book to user's library. Saves book, author, category to db as new entries if they do not yet exist in db.
   * @param bookDTO: BookDTO
   */
  addBookToLibrary(bookDTO: BookDTO) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key),
    });
    return this.http.post(environment.api.resources_url + '/library/book', bookDTO, {headers, responseType: 'text'});
  }

  removeBookFromLibrary(bookDTO: BookDTO) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    return this.http.delete(environment.api.resources_url + '/library/book/' + bookDTO.id, {headers, responseType: 'text'});
  }
}
