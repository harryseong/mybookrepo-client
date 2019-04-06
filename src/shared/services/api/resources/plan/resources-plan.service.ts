import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BookDTO, PlanDTO} from '../../../../dto/dto.module';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourcesPlanService {
  planCreatedEvent$ = new Subject<any>();
  planUpdatedEvent$ = new Subject<any>();
  planDeletedEvent$ = new Subject<any>();
  bookAddedToPlanEvent$ = new Subject<any>();
  bookRemovedFromPlanEvent$ = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  planCreated(planDTO: PlanDTO) {
    this.planCreatedEvent$.next(planDTO);
  }

  planUpdated(planDTO: PlanDTO) {
    this.planUpdatedEvent$.next(planDTO);
  }

  planDeleted(planDTO: PlanDTO) {
    this.planDeletedEvent$.next(planDTO);
  }

  bookAddedToPlan(bookDTO: BookDTO) {
    this.bookAddedToPlanEvent$.next(bookDTO);
  }

  bookRemovedFromPlan(bookDTO: BookDTO) {
    this.bookRemovedFromPlanEvent$.next(bookDTO);
  }

  // Plans
  getAllPlans(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    return this.http.get(environment.api.resources_url + '/plan', {headers});
  }

  createPlan(planDTO: PlanDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key),
    });
    return this.http.post(environment.api.resources_url + '/plan', planDTO, {headers, responseType: 'text'});
  }

  updatePlan(planDTO: PlanDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key),
    });
    const params = new HttpParams()
      .set('planId', planDTO.id);
    return this.http.put(environment.api.resources_url + '/plan/', planDTO, {headers, params, responseType: 'text'});
  }

  deletePlan(planId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    const params = new HttpParams()
      .set('planId', planId);
    return this.http.delete(environment.api.resources_url + '/plan/', {headers, params, responseType: 'text'});
  }

  // Books in Plan
  getAllPlanBooks(planId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    const params = new HttpParams()
      .set('planId', planId);
    return this.http.get(environment.api.resources_url + '/plan/book', {headers, params});
  }

  addBookToPlan(planId: string, bookId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key),
    });
    const params = new HttpParams()
      .set('planId', planId)
      .set('bookId', bookId);
    return this.http.post(environment.api.resources_url + '/plan/book', null, {headers, params, responseType: 'text'});
  }

  updateBookInPlan(planId: string, bookId: string, newStatus: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key),
    });
    const params = new HttpParams()
      .set('planId', planId)
      .set('bookId', bookId)
      .set('newStatus', newStatus);
    return this.http.put(environment.api.resources_url + '/plan/book', null, {headers, params, responseType: 'text'});
  }

  removeBookFromPlan(planId: string, bookId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key),
    });
    const params = new HttpParams()
      .set('planId', planId)
      .set('bookId', bookId);
    return this.http.delete(environment.api.resources_url + '/plan/book', {headers, params, responseType: 'text'});
  }
}
