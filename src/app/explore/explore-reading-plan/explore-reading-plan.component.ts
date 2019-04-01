import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from '../../../shared/services/dialog/dialog.service';
import {animate, query, sequence, stagger, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {ResourcesApiService} from '../../../shared/services/api/resources/resources-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-explore-reading-plan',
  templateUrl: './explore-reading-plan.component.html',
  styleUrls: ['./explore-reading-plan.component.scss'],
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
export class ExploreReadingPlanComponent implements OnInit, OnDestroy {
  planCreated$: Subscription;
  planUpdated$: Subscription;
  planDeleted$: Subscription;
  planArray: any[] = [];
  isLoading = true;
  currentPlan = '';

  constructor(
    private dialogService: DialogService,
    private resourcesApiService: ResourcesApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.planCreated$ = this.resourcesApiService.$planCreatedEvent.subscribe((createdPlanName) => {
      this.getPlans();
      this.router.navigate(['/explore/johndoe123/plan/view', createdPlanName]);
    });
    this.planUpdated$ = this.resourcesApiService.$planUpdatedEvent.subscribe((updatedPlanName) => {
      this.getPlans();
      this.router.navigate(['/explore/johndoe123/plan/view', updatedPlanName]);
    });
    this.planDeleted$ = this.resourcesApiService.$planDeletedEvent.subscribe((deletedPlanName) => {
      this.getPlans();
      this.router.navigate(['/explore/johndoe123/plan']);
    });
    this.getPlans();
  }

  ngOnDestroy(): void {
    this.planCreated$.unsubscribe();
    this.planUpdated$.unsubscribe();
    this.planDeleted$.unsubscribe();
  }

  getPlans() {
    const plans: any[] = JSON.parse(localStorage.getItem('plans'));
    if (plans !== undefined && plans !== null && plans.length > 0) {
      this.planArray = plans;
    } else {
      const samplePlans = [
        {name: '2019', description: 'My reading plan for the year 2019.'},
        {name: '2018', description: 'My reading plan for the year 2018.'},
      ];
      this.planArray = samplePlans;
      localStorage.setItem('plans', JSON.stringify(samplePlans));
    }
  }

  addPlan() {
    this.dialogService.openPlanDialog(null, 'CREATE');
  }

  removePlan() {

  }

}
