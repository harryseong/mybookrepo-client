import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {Subscription} from 'rxjs';
import {ResourcesApiService} from '../../../shared/services/api/resources/resources-api.service';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {UserService} from '../../../shared/services/user/user.service';
import {ResourcesPlanService} from '../../../shared/services/api/resources/plan/resources-plan.service';
import {SnackBarService} from '../../../shared/services/snackBar/snack-bar.service';
import {PlanDTO} from '../../../shared/dto/dto.module';

@Component({
  selector: 'app-user-plan',
  templateUrl: './user-plan.component.html',
  styleUrls: ['./user-plan.component.scss'],
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
export class UserPlanComponent implements OnInit, OnDestroy {
  planCreated$: Subscription;
  planUpdated$: Subscription;
  planDeleted$: Subscription;
  planArray: any[] = [];
  isLoading = true;
  currentPlan: PlanDTO = null;

  constructor(
    private dialogService: DialogService,
    private resourcesApiService: ResourcesApiService,
    private resourcesPlanService: ResourcesPlanService,
    private router: Router,
    private snackBarService: SnackBarService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.planCreated$ = this.resourcesPlanService.planCreatedEvent$.subscribe((createdPlan) => {
      this.snackBarService.openSnackBar('"' + createdPlan.name + '" was created.', 'OK');
      this.getPlans();
      this.router.navigate(['/user', this.userService.username, 'plan', createdPlan.name]);
    });
    this.planUpdated$ = this.resourcesPlanService.planUpdatedEvent$.subscribe((updatedPlanName) => {
      this.getPlans();
      this.router.navigate(['/user', this.userService.username, 'plan', updatedPlanName]);
    });
    this.planDeleted$ = this.resourcesPlanService.planDeletedEvent$.subscribe((deletedPlanName) => {
      this.getPlans();
      this.router.navigate(['/user', this.userService.username, 'plan']);
    });
    this.getPlans();
  }

  ngOnDestroy(): void {
    this.planCreated$.unsubscribe();
    this.planUpdated$.unsubscribe();
    this.planDeleted$.unsubscribe();
  }

  getPlans() {
    this.resourcesPlanService.getAllPlans().subscribe(
      rsp => {
        this.planArray = rsp.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name) ? 0 : -1);
      }
    );
  }

  viewPlan(planDTO: PlanDTO) {
    this.currentPlan = null;
    this.currentPlan = planDTO;
  }

  addPlan() {
    this.dialogService.openPlanDialog(null, 'CREATE');
  }

  removePlan() {

  }
}
