import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ExploreComponent} from './explore/explore.component';
import {ExploreSearchComponent} from './explore/explore-my-library/explore-search/explore-search.component';
import {ExploreMyLibraryComponent} from './explore/explore-my-library/explore-my-library.component';
import {ExploreProfileComponent} from './explore/explore-profile/explore-profile.component';
import {AboutComponent} from './about/about.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {UserLibraryComponent} from './user-home/user-library/user-library.component';
import {AuthGuard} from './auth.guard';
import {ExploreReadingPlanComponent} from './explore/explore-reading-plan/explore-reading-plan.component';
import {ExploreReadingPlanSearchComponent} from './explore/explore-reading-plan/explore-reading-plan-search/explore-reading-plan-search.component';
import {ExploreReadingPlanTableComponent} from './explore/explore-reading-plan/explore-reading-plan-table/explore-reading-plan-table.component';
import {UserAccountComponent} from './user-home/user-account/user-account.component';
import {UserPlanComponent} from './user-home/user-plan/user-plan.component';
import {UserLibraryAddComponent} from './user-home/user-library/user-library-add/user-library-add.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'about', component: AboutComponent},
  {path: 'user/:username', component: UserHomeComponent,
    children: [
      {path: '', redirectTo: 'library', pathMatch: 'full', canActivate: [AuthGuard]},
      {path: 'library', component: UserLibraryComponent, canActivate: [AuthGuard]},
      {path: 'library/add', component: UserLibraryAddComponent, canActivate: [AuthGuard]},
      {path: 'plan', component: UserPlanComponent, canActivate: [AuthGuard]},
      {path: 'account', component: UserAccountComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: 'explore', redirectTo: 'explore/johndoe123', pathMatch: 'full'},
  {path: 'explore/johndoe123', component: ExploreComponent,
    children: [
      {path: '', redirectTo: 'plan', pathMatch: 'full'},
      {path: 'plan', component: ExploreReadingPlanComponent,
        children: [
          {path: 'view/:id', component: ExploreReadingPlanTableComponent}
        ]
      },
      {path: 'plan/add', component: ExploreReadingPlanSearchComponent},
      {path: 'account', component: ExploreProfileComponent},
      {path: 'library', component: ExploreMyLibraryComponent},
      {path: 'library/add', component: ExploreSearchComponent},
    ]
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
