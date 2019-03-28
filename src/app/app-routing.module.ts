import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ExploreComponent} from './explore/explore.component';
import {ExploreSearchComponent} from './explore/explore-search/explore-search.component';
import {ExploreViewByYearsComponent} from './explore/explore-view-by-years/explore-view-by-years.component';
import {ExploreMyLibraryComponent} from './explore/explore-my-library/explore-my-library.component';
import {ExploreProfileComponent} from './explore/explore-profile/explore-profile.component';
import {AboutComponent} from './about/about.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {UserProfileComponent} from './user-home/user-profile/user-profile.component';
import {UserLibraryComponent} from './user-home/user-library/user-library.component';
import {AuthGuard} from './auth.guard';
import {ExploreReadingPlanComponent} from './explore/explore-reading-plan/explore-reading-plan.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'about', component: AboutComponent},
  {path: 'user', component: UserHomeComponent,
    children: [
      {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
      {path: 'library', component: UserLibraryComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: 'explore', component: ExploreComponent,
    children: [
      {path: '', component: ExploreMyLibraryComponent},
      {path: 'reading-plan', component: ExploreReadingPlanComponent},
      {path: 'account', component: ExploreProfileComponent},
      {path: 'my-library', component: ExploreMyLibraryComponent},
      {path: 'search', component: ExploreSearchComponent},
      {path: 'view-by-years', component: ExploreViewByYearsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
