import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SubscribeErrorStateMatcher} from '../../shared/SubscriberErrorStateMatcher.module';
import {Router} from '@angular/router';
import {AuthApiService} from '../../shared/services/api/auth/auth-api.service';
import {UserDTO} from '../../shared/dto/dto.module';
import {UserService} from '../../shared/services/user/user.service';
import {SnackBarService} from '../../shared/services/snackBar/snack-bar.service';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    trigger('contentAnimations', [
      transition(':enter', [
        query('.content-element', [
          style({ opacity: 0, transform: 'translateY(1em)'}),
          stagger(100, [
            sequence([
              animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' })),
            ])
          ])
        ])
      ]),
    ])
  ]
})
export class SignupComponent implements OnInit {
  matcher: SubscribeErrorStateMatcher; // For form error matching.
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private router: Router, private authApiService: AuthApiService, private userService: UserService,
              private snackBarService: SnackBarService) { }

  ngOnInit() {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.router.navigate(['']);
    }
  }

  checkEmailInDB() {
    if (this.signupForm.get('email').valid) {
      this.authApiService.checkEmailAvailability(this.signupForm.get('email').value).subscribe(
        rsp => {
          if (rsp === false) {
            this.signupForm.get('email').setErrors({emailNotAvailable: true});
            console.warn('Email is already associated with existing account.');
          }
        }
      );
    }
  }

  checkUsernameInDB() {
    if (this.signupForm.get('username').valid) {
      this.authApiService.checkUsernameAvailability(this.signupForm.get('username').value).subscribe(
        rsp => {
          if (rsp === false) {
            this.signupForm.get('username').setErrors( {usernameNotAvailable: true});
            console.warn('Username has already been taken.');
          }
        }
      );
    }
  }

  verifyPassword() {
    const form = this.signupForm.value;
    if (this.signupForm.get('password').touched && this.signupForm.get('passwordConfirm').touched &&
      form.password !== form.passwordConfirm) {
      this.signupForm.get('password').setErrors({passwordsDoNotMatch: true});
      this.signupForm.get('passwordConfirm').setErrors({passwordsDoNotMatch: true});
      console.warn('The passwords do not match.');
    } else if (this.signupForm.get('password').touched && this.signupForm.get('passwordConfirm').touched &&
      form.password === form.passwordConfirm) {
      if (form.password.length === 0) {
        this.signupForm.get('password').setErrors({required: true});
        this.signupForm.get('passwordConfirm').setErrors({required: true});
      } else if (form.password.length > 0 && form.password.length < 6) {
        this.signupForm.get('password').setErrors({minlength: true});
        this.signupForm.get('passwordConfirm').setErrors({minlength: true});
      } else {
        this.signupForm.get('password').setErrors(null);
        this.signupForm.get('passwordConfirm').setErrors(null);
      }
    }
  }

  signup() {
    if (!this.signupForm.valid) {
      return;
    }
    const form = this.signupForm.value;
    const userDTO: UserDTO = {
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username,
      email: form.email,
      password: form.password
    };

    this.authApiService.signup(userDTO).subscribe(
      rsp => {
        console.log(rsp);
        this.signupForm.reset();
        this.userService.login(userDTO.username, userDTO.password);
        this.snackBarService.openSnackBar('Welcome to My Book Repo!', 'Sweet!');
      },
      error1 => console.error(error1));
  }
}
