import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {Subscription} from 'rxjs';
import {animate, query, sequence, stagger, style, transition, trigger} from '@angular/animations';
import {ResourcesPlanService} from '../../../shared/services/api/resources/plan/resources-plan.service';
import {SnackBarService} from '../../../shared/services/snackBar/snack-bar.service';
import {PlanDTO} from '../../../shared/dto/dto.module';
import {UserService} from '../../../shared/services/user/user.service';

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
  toRead = [];
  reading = [];
  done = [];
  isLoading = true;
  currentPlan: PlanDTO = null;
  currentPlanId: string;

  constructor(
    private dialogService: DialogService,
    private resourcesPlanService: ResourcesPlanService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.currentPlanId = params.get('planId');
        this.getPlans();
      }
    );

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

        // If current plan ID from activated route is not null, set the proper current plan.
        if (this.currentPlanId !== null) {
          const currentPlanIndex = this.planArray.findIndex(plan => plan.id === this.currentPlanId);
          this.currentPlan = this.planArray[currentPlanIndex];
        }

        // If planDTO parameter has been specified for "planCreated$", set the current plan accordingly.
        // This is because a new plan's planDTO's id remains null.
        if (planDTO !== undefined) {
          const newPlanIndex = this.planArray.findIndex(plan => plan.name === planDTO.name);
          this.currentPlan = this.planArray[newPlanIndex];
        }
      }
    );
  }

  getBooks() {
    this.clearBookBoard();
    this.resourcesPlanService.getAllPlanBooks(this.currentPlan.id).subscribe(
      rsp => {
        rsp.map(
          planBook => {
            if (planBook.status === 0) {
              this.toRead.push(planBook.book);
            } else if (planBook.status === 1) {
              this.reading.push(planBook.book);
            } else if (planBook.status === 2) {
              this.done.push(planBook.book);
            }
          }
        );
        this.isLoading = false;
      }
    );
  }

  clearBookBoard() {
    this.isLoading = true;
    this.toRead = [];
    this.reading = [];
    this.done = [];
  }

  viewPlan(planDTO: PlanDTO) {
    this.router.navigate(['/user', this.userService.username, 'plan', planDTO.id]);
    this.currentPlan = planDTO;
    this.currentPlanId = planDTO.id;
    this.getBooks();
  }

  createPlan() {
    this.dialogService.openPlanDialog(null, 'CREATE');
  }

  removePlan() {

  }
}
