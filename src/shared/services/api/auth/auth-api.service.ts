import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {UserDTO} from '../../../dto/dto.module';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) { }

  /**
   * Method to take user-entered credentials to acquire a valid access token with which the client will have authorization to make api
   * calls to the resources server api endpoints.
   * @param username: User-entered email address at at the login screen.
   * @param password: User-entered password at the login screen.
   */
  getAccessToken(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(environment.jwt.client.id + ':' + environment.jwt.client.secret)
      })
    };
    const body =
      `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=${environment.jwt.grant_type}`;
    return this.http.post(environment.api.auth_token_url, body, httpOptions);
  }

  /**
   * Method to check db if the user-entered email address for a new account is available or in use.
   * @param email: User-entered email address in the signup form.
   */
  checkEmailAvailability(email: string): Observable<any> {
    return this.http.get(environment.api.auth_account_url + '/email/' + email);
  }

  /**
   * Method to check db if the user-entered username for a new account is available or in use.
   * @param username: User-entered username in the signup form.
   */
  checkUsernameAvailability(username: string): Observable<any> {
    return this.http.get(environment.api.auth_account_url + '/username/' + username);
  }

  /**
   * Method to signup to create a new account.
   * @param userDTO: UserDTO constructed from the contents of the signup form.
   */
  signup(userDTO: UserDTO): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(environment.api.auth_account_url, userDTO, {headers, responseType: 'text'});
  }
}
