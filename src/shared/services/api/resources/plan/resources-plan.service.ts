import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BookDTO, PlanDTO} from '../../../../dto/dto.module';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourcesPlanService {
  planCreatedEvent$ = new Subject<any>();
  planUpdatedEvent$ = new Subject<any>();
  planDeletedEvent$ = new Subject<any>();

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
    return this.http.put(environment.api.resources_url + '/plan/' + planDTO.id, planDTO, {headers, responseType: 'text'});
  }

  deletePlan(planDTO: PlanDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(environment.jwt.local_storage_key)
    });
    return this.http.delete(environment.api.resources_url + '/plan/' + planDTO.id, {headers, responseType: 'text'});
  }
}
