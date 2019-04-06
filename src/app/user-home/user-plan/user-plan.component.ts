import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router, RoutesRecognized} from '@angular/router';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import { Subscription} from 'rxjs';
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
  plans: any[] = [];
  toRead = [];
  reading = [];
  done = [];
  isLoading = true;
  currentPlan: PlanDTO = null;

  constructor(
    private dialogService: DialogService,
    private resourcesPlanService: ResourcesPlanService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.getAllPlans();

    this.planCreated$ = this.resourcesPlanService.planCreatedEvent$.subscribe((newPlanDTO: PlanDTO) => {
      this.getAllPlans(newPlanDTO);
      this.snackBarService.openSnackBar('"' + newPlanDTO.name + '" was created.', 'OK');
    });
    this.planUpdated$ = this.resourcesPlanService.planUpdatedEvent$.subscribe((planDTO: PlanDTO) => {
      this.getAllPlans();
      this.currentPlan = planDTO;
      this.snackBarService.openSnackBar('"' + planDTO.name + '" was updated.', 'OK');
    });
    this.planDeleted$ = this.resourcesPlanService.planDeletedEvent$.subscribe((planDTO: PlanDTO) => {
      this.getAllPlans();
      this.router.navigate(['/user', this.userService.username, 'plan']);
      this.currentPlan = null;
      this.snackBarService.openSnackBar('"' + planDTO.name + '" was deleted.', 'OK');
    });
  }

  /**
   * Unsubscribe from everything as component exited.
   */
  ngOnDestroy(): void {
    this.planCreated$.unsubscribe();
    this.planUpdated$.unsubscribe();
    this.planDeleted$.unsubscribe();
  }

  /**
   * Gets all plans for user.
   * @param newPlanDTO: Optional param accepted after a new plan creation in order to navigate to new plan.
   */
  getAllPlans(newPlanDTO?: PlanDTO) {
    this.resourcesPlanService.getAllPlans().subscribe(
      rsp => {
        // Sort plans by name.
        this.plans = rsp.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name) ? 0 : -1);

        // If newly create plan exists, view new plan and set new plan as the current plan.
        if (newPlanDTO !== null && newPlanDTO !== undefined) {

          // Newly created plan should be retrieved from this fresh list of plans so that the new planDTO will contain the id number.
          this.viewPlan(this.plans.find(plan => plan.name === newPlanDTO.name));
        }

        this.isLoading = false;
      }
    );
  }

  /**
   * Sets new current plan, navigates to plan route, and gets books for newly selected plan.
   * @param planDTO: Plan to set as current view and to view.
   */
  viewPlan(planDTO: PlanDTO) {
    this.currentPlan = planDTO;
    this.router.navigate(['/user', this.userService.username, 'plan', planDTO.id]);
    this.getBooks();
  }

  /**
   * Gets all books for the newly selected plan.
   */
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

  /**
   * Resets the book board before getting different sets of books for newly selected plan.
   */
  clearBookBoard() {
    this.isLoading = true;
    this.toRead = [];
    this.reading = [];
    this.done = [];
  }

  /**
   * Opens up the create plan dialog.
   */
  createPlan() {
    this.dialogService.openPlanDialog(null, 'CREATE');
  }
}
