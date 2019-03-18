import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SubscribeErrorStateMatcher} from '../../shared/SubscriberErrorStateMatcher.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  matcher: SubscribeErrorStateMatcher; // For form error matching.
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('[^A-Za-z0-9]')]),
    passwordConfirm: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit() {
  }
}
