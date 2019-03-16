import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MaterialModule} from '../material.module';
import {AuthApiService} from '../shared/services/api/auth-api/auth-api.service';
import {GoogleBooksApiService} from '../shared/services/api/google-books-api/google-books-api.service';
import {ResourcesApiService} from '../shared/services/api/resources-api/resources-api.service';
import {UserService} from '../shared/services/user/user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    AuthApiService,
    GoogleBooksApiService,
    ResourcesApiService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
