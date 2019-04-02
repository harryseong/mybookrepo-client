import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import * as crypto from 'crypto-js';
import {Router} from '@angular/router';
import {AuthApiService} from '../api/auth/auth-api.service';
import {UserDTO} from '../../dto/dto.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoading = false;
  loginStatus = {error: false, message: ''};
  accessToken: string = null; // Use presence of accessToken as flag for whether user is logged in or not.
  isAdmin: false;
  username: string;
  userFullName: string;    // Use as display name on navbar and sidnav.
  userDTO: UserDTO;
  gravatarProfileImg40: string;
  gravatarProfileImg500: string;
  jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router, private authApiService: AuthApiService) {}

  checkAccessToken() {
    const accessToken = localStorage.getItem(environment.jwt.local_storage_key);
    if (accessToken !== null && accessToken !== undefined) {
      this.processAccessToken(accessToken);
    }
  }

  /**
   * Method to request access token with user-inputted username and password. If the credentials are valid, the auth server will return
   * a valid access token.
   * 1. Request access token with user-inputted username and password.
   * 2. Save access token.
   * 3. Decode access token and save user information.
   * @param username: User-inputted account email address.
   * @param password: User-inputted account password.
   */
  login(username: string, password: string) {
    this.isLoading = true;
    this.authApiService.getAccessToken(username, password).subscribe(
      rsp => {
        this.processAccessToken(rsp.access_token);
        this.resetLoginStatus();
      },
      error => {
        console.warn(JSON.stringify(error));
        if (error.error.error === 'invalid_grant') {
          this.loginStatus.error = true;
          this.loginStatus.message = 'Invalid credentials entered. Please enter valid credentials.';
          console.warn('Incorrect credentials.');
        } else {
          this.loginStatus.error = true;
          this.loginStatus.message = 'There was a server error that prevented login. Please refresh the page and try again.';
          console.error('There was a server error that prevented authentication.');
        }
      }
    );
  }

  resetLoginStatus() {
    this.loginStatus.error = false;
    this.loginStatus.message = '';
  }

  processAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    const decodedToken = this.jwtHelperService.decodeToken(this.accessToken);
    this.isAdmin = decodedToken.authorities.some(el => el === 'admin');
    this.username = decodedToken.user_name;
    this.getUserByUsername(this.username).subscribe(
      (userDTO: UserDTO) => {
        this.userDTO = userDTO;
        this.gravatarProfileImg40 = 'https://www.gravatar.com/avatar/' + crypto.MD5(this.userDTO.email).toString() + '?s=40';
        this.gravatarProfileImg500 = 'https://www.gravatar.com/avatar/' + crypto.MD5(this.userDTO.email).toString() + '?s=500';
        this.userFullName = userDTO.firstName + ' ' + userDTO.lastName;
        this.isLoading = false;
      }
    );
    // Save access token to local storage until logout.
    localStorage.setItem(environment.jwt.local_storage_key, this.accessToken);
    this.router.navigate(['user', this.username]);
  }

  /**
   * Reset user attributes and route to home.
   */
  logout() {
    this.resetUser();
    this.router.navigate(['']);
  }

  /**
   * Reset user attributes. Remove access token from browser.
   */
  resetUser() {
    this.accessToken = null;
    this.isAdmin = false;
    this.username = null;
    this.userFullName = null;
    localStorage.removeItem(environment.jwt.local_storage_key);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }

  getUserByEmail(email: string) {
    return this.http.get(environment.api.resources_url + '/user/email/' + email);
  }

  getUserByUsername(username: string) {
    return this.http.get(environment.api.resources_url + '/user/username/' + username);
  }
}
