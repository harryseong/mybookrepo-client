import {Component, HostListener, OnInit} from '@angular/core';
import {SubscribeErrorStateMatcher} from '../../shared/SubscriberErrorStateMatcher.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user/user.service';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('contentAnimations', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(0.5em)'}),
        animate('1s ease', style({ opacity: 1, transform: 'translateY(0)'})),
      ])
    ]),
    trigger('errorMessageAnimations', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('0.3s ease', style({ opacity: 1})),
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  matcher: SubscribeErrorStateMatcher; // For form error matching.
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit() {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.leaveLogin();
    }
  }

  leaveLogin() {
    this.userService.resetLoginStatus();
    this.router.navigate(['']);
  }

  login() {
    const form = this.loginForm.value;
    if (this.loginForm.valid) {
      this.userService.login(form.username, form.password);
    }
  }
}
