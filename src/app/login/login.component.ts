import { Component, OnInit } from '@angular/core';
import {SubscribeErrorStateMatcher} from '../../shared/SubscriberErrorStateMatcher.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  matcher: SubscribeErrorStateMatcher; // For form error matching.
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit() {
  }

}
