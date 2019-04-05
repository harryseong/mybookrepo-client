import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {BookDTO} from '../../../../dto/dto.module';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourcesLibraryService {
  bookAddedEvent$ = new Subject<any>();
  bookRemovedEvent$ = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  bookAddedToLibrary(bookDTO: BookDTO) {
    this.bookAddedEvent$.next(bookDTO);
  }

  bookRemovedFromLibrary(bookDTO: BookDTO) {
    this.bookRemovedEvent$.next(bookDTO);
  }

  getAllBooks(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    return this.http.get(environment.api.resources_url + '/library/books', {headers});
  }

  addBookToLibrary(bookDTO: BookDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key),
    });
    return this.http.post(environment.api.resources_url + '/library/book', bookDTO, {headers, responseType: 'text'});
  }

  removeBookFromLibrary(bookDTO: BookDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    return this.http.delete(environment.api.resources_url + '/library/book/' + bookDTO.id, {headers, responseType: 'text'});
  }

  getBarcodeInfo(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key),
    });
    return this.http.post(environment.api.resources_url + '/library/book/barcode', null, {headers, responseType: 'text'});
  }
}
