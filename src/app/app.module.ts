import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MaterialModule} from '../material.module';
import {AuthApiService} from '../shared/services/api/auth/auth-api.service';
import {GoogleBooksApiService} from '../shared/services/api/google-books/google-books-api.service';
import {ResourcesApiService} from '../shared/services/api/resources/resources-api.service';
import {UserService} from '../shared/services/user/user.service';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ExploreComponent } from './explore/explore.component';
import { ExploreSearchComponent } from './explore/explore-search/explore-search.component';
import { ExploreMyLibraryComponent } from './explore/explore-my-library/explore-my-library.component';
import { ExploreViewByYearsComponent } from './explore/explore-view-by-years/explore-view-by-years.component';
import { ExploreProfileComponent } from './explore/explore-profile/explore-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ExploreComponent,
    ExploreSearchComponent,
    ExploreMyLibraryComponent,
    ExploreViewByYearsComponent,
    ExploreProfileComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
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
