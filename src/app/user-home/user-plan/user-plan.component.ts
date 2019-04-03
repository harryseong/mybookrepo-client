import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {Subscription} from 'rxjs';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
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
    private resourcesPlanService: ResourcesPlanService,
    private router: Router,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit() {
    this.planCreated$ = this.resourcesPlanService.planCreatedEvent$.subscribe((planDTO: PlanDTO) => {
      this.getPlans(planDTO);
      this.snackBarService.openSnackBar('"' + planDTO.name + '" was created.', 'OK');
    });
    this.planUpdated$ = this.resourcesPlanService.planUpdatedEvent$.subscribe((planDTO: PlanDTO) => {
      this.getPlans();
      this.currentPlan = planDTO;
      this.snackBarService.openSnackBar('"' + planDTO.name + '" was updated.', 'OK');
    });
    this.planDeleted$ = this.resourcesPlanService.planDeletedEvent$.subscribe((planDTO: PlanDTO) => {
      this.currentPlan = null;
      this.getPlans();
      this.snackBarService.openSnackBar('"' + planDTO.name + '" was deleted.', 'OK');
    });
    this.getPlans();
  }

  ngOnDestroy(): void {
    this.planCreated$.unsubscribe();
    this.planUpdated$.unsubscribe();
    this.planDeleted$.unsubscribe();
  }

  getPlans(planDTO?: PlanDTO) {
    this.resourcesPlanService.getAllPlans().subscribe(
      rsp => {
        this.planArray = rsp.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name) ? 0 : -1);

        // If planDTO parameter has been specified for "planCreated$", set the current plan accordingly.
        // This is because a new plan's planDTO's id remains null.
        if (planDTO !== undefined) {
          const newPlanIndex = this.planArray.findIndex(plan => plan.name === planDTO.name);
          this.currentPlan = this.planArray[newPlanIndex];
        }
      }
    );
  }

  viewPlan(planDTO: PlanDTO) {
    this.currentPlan = planDTO;
  }

  createPlan() {
    this.dialogService.openPlanDialog(null, 'CREATE');
  }

  removePlan() {

  }
}
