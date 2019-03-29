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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExploreComponent } from './explore/explore.component';
import { ExploreSearchComponent } from './explore/explore-my-library/explore-search/explore-search.component';
import { ExploreMyLibraryComponent } from './explore/explore-my-library/explore-my-library.component';
import { ExploreProfileComponent } from './explore/explore-profile/explore-profile.component';
import {SnackBarService} from '../shared/services/snackBar/snack-bar.service';
import {HttpClientModule} from '@angular/common/http';
import { BookDetailsDialogComponent } from '../shared/dialogs/book-details-dialog/book-details-dialog.component';
import {DialogService} from '../shared/services/dialog/dialog.service';
import { BookCardComponent } from '../shared/book-card/book-card.component';
import { AboutComponent } from './about/about.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-home/user-profile/user-profile.component';
import { UserLibraryComponent } from './user-home/user-library/user-library.component';
import { ExploreFirstTimeDialogComponent } from '../shared/dialogs/explore-first-time-dialog/explore-first-time-dialog.component';
import { ExploreReadingPlanComponent } from './explore/explore-reading-plan/explore-reading-plan.component';
import {LayoutModule} from '@angular/cdk/layout';
import { ExploreReadingPlanSearchComponent } from './explore/explore-reading-plan/explore-reading-plan-search/explore-reading-plan-search.component';

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
    ExploreProfileComponent,
    BookDetailsDialogComponent,
    BookCardComponent,
    AboutComponent,
    UserHomeComponent,
    UserProfileComponent,
    UserLibraryComponent,
    ExploreFirstTimeDialogComponent,
    ExploreReadingPlanComponent,
    ExploreReadingPlanSearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    BookDetailsDialogComponent,
    ExploreFirstTimeDialogComponent
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    AuthApiService,
    DialogService,
    GoogleBooksApiService,
    ResourcesApiService,
    SnackBarService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
