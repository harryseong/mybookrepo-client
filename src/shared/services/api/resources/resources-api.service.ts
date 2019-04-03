import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {BookDTO, PlanDTO} from '../../../dto/dto.module';

@Injectable({
  providedIn: 'root'
})
export class ResourcesApiService {
  bookAddedEvent$ = new Subject<any>();
  bookRemovedEvent$ = new Subject<any>();
  planCreatedEvent$ = new Subject<any>();
  planUpdatedEvent$ = new Subject<any>();
  planDeletedEvent$ = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  bookAddedToLibrary(bookDTO: BookDTO) {
    this.bookAddedEvent$.next(bookDTO);
  }

  bookRemovedFromLibrary(bookDTO: BookDTO) {
    this.bookRemovedEvent$.next(bookDTO);
  }

  planCreated(planDTO: PlanDTO) {
    this.planCreatedEvent$.next(planDTO);
  }

  planUpdated(planDTO: PlanDTO) {
    this.planUpdatedEvent$.next(planDTO);
  }

  planDeleted(planDTO: PlanDTO) {
    this.planDeletedEvent$.next(planDTO);
  }

  getUser() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    return this.http.get(environment.api.resources_url + '/user', {headers});
  }
}
