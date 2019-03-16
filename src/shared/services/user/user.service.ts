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
  accessToken: string = null; // Use presence of accessToken as flag for whether user is logged in or not.
  isAdmin: false;
  username: string;
  userDisplayName: string;    // Use as display name on navbar and sidnav.
  userDTO: UserDTO;
  gravatarProfileImg: string;
  jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router, private authApiService: AuthApiService) {}

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
        this.accessToken = rsp.access_token;
        const decodedToken = this.jwtHelperService.decodeToken(this.accessToken);
        this.isAdmin = decodedToken.authorities.some(el => el === 'admin');
        this.username = decodedToken.user_name;
        this.gravatarProfileImg = 'https://www.gravatar.com/avatar/' + crypto.MD5(this.username).toString();
        this.getUserByEmail(this.username).subscribe(
          (userDTO: UserDTO) => {
            this.userDTO = userDTO;
            this.userDisplayName = userDTO.firstName + ' ' + userDTO.lastName;
            this.isLoading = false;
          }
        );
        // Save access token to local storage until logout.
        localStorage.setItem(environment.jwt.name, this.accessToken);
        this.router.navigate(['library']);
      }
    );
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
    this.userDisplayName = null;
    localStorage.removeItem(environment.jwt.name);
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
}
