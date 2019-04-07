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
import { BookCardComponent } from '../shared/view-books/book-cards/book-card/book-card.component';
import { AboutComponent } from './about/about.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLibraryComponent } from './user-home/user-library/user-library.component';
import { ExploreFirstTimeDialogComponent } from '../shared/dialogs/explore-first-time-dialog/explore-first-time-dialog.component';
import { ExploreReadingPlanComponent } from './explore/explore-reading-plan/explore-reading-plan.component';
import {LayoutModule} from '@angular/cdk/layout';
import { ExploreReadingPlanSearchComponent } from './explore/explore-reading-plan/explore-reading-plan-search/explore-reading-plan-search.component';
import { PlanDialogComponent } from '../shared/dialogs/plan-dialog/plan-dialog.component';
import { ExploreReadingPlanTableComponent } from './explore/explore-reading-plan/explore-reading-plan-table/explore-reading-plan-table.component';
import { UserAccountComponent } from './user-home/user-account/user-account.component';
import { UserPlanComponent } from './user-home/user-plan/user-plan.component';
import { UserLibraryAddComponent } from './user-home/user-library/user-library-add/user-library-add.component';
import {ProgressSpinnerComponent} from '../shared/progress-spinner/progress-spinner.component';
import { UserPlanBoardComponent } from './user-home/user-plan/user-plan-board/user-plan-board.component';
import {ResourcesLibraryService} from '../shared/services/api/resources/library/resources-library.service';
import {ResourcesPlanService} from '../shared/services/api/resources/plan/resources-plan.service';
import { UserPlanAddComponent } from './user-home/user-plan/user-plan-add/user-plan-add.component';
import {BookService} from '../shared/services/book/book.service';
import { BookTableComponent } from '../shared/view-books/book-table/book-table.component';
import { BookCardsComponent } from '../shared/view-books/book-cards/book-cards.component';
import { ViewBooksComponent } from '../shared/view-books/view-books.component';

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
    UserLibraryComponent,
    ExploreFirstTimeDialogComponent,
    ExploreReadingPlanComponent,
    ExploreReadingPlanSearchComponent,
    PlanDialogComponent,
    ExploreReadingPlanTableComponent,
    UserAccountComponent,
    UserPlanComponent,
    UserLibraryAddComponent,
    ProgressSpinnerComponent,
    UserPlanBoardComponent,
    UserPlanAddComponent,
    BookTableComponent,
    BookCardsComponent,
    ViewBooksComponent,
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
    ExploreFirstTimeDialogComponent,
    PlanDialogComponent
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    AuthApiService,
    DialogService,
    GoogleBooksApiService,
    ResourcesLibraryService,
    ResourcesPlanService,
    SnackBarService,
    UserService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
