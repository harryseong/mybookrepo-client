import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlanDTO} from '../../dto/dto.module';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';
import {ResourcesPlanService} from '../../services/api/resources/plan/resources-plan.service';

@Component({
  selector: 'app-plan-dialog',
  templateUrl: './plan-dialog.component.html',
  styleUrls: ['./plan-dialog.component.scss']
})
export class PlanDialogComponent implements OnInit {
  planForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<PlanDialogComponent>,
    private resourcesPlanService: ResourcesPlanService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data.type === 'EDIT' || this.data.type === 'EXPLORE_EDIT') {
      this.planForm.get('name').setValue(this.data.plan.name);
      this.planForm.get('description').setValue(this.data.plan.description);
    }
  }

  closeDialog() {
    this.planForm.reset();
    this.dialogRef.close();
  }

  submit() {
    if (this.planForm.valid) {
      switch (this.data.type) {
        case 'CREATE': {
          this.createPlan();
          break;
        }
        case 'EDIT': {
          this.updatePlan();
          break;
        }
        case 'DELETE': {
          this.deletePlan();
          break;
        }
        case 'EXPLORE_CREATE': {
          this.exploreCreatePlan();
          break;
        }
        case 'EXPLORE_EDIT': {
          this.exploreUpdatePlan();
          break;
        }
        case 'EXPLORE_DELETE': {
          this.exploreDeletePlan();
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  createPlan() {
    const newPlan: PlanDTO = new PlanDTO(this.planForm.get('name').value, this.planForm.get('description').value);
    this.resourcesPlanService.createPlan(newPlan).subscribe(
      rsp => {
        this.resourcesPlanService.planCreatedEvent$.next(newPlan);
        this.closeDialog();
      }
    );
  }

  updatePlan() {
    const updatedPlan: PlanDTO = new PlanDTO(this.planForm.get('name').value, this.planForm.get('description').value, this.data.plan.id);
    this.resourcesPlanService.updatePlan(updatedPlan).subscribe(
      rsp => {
        this.resourcesPlanService.planUpdatedEvent$.next(updatedPlan);
        this.closeDialog();
      }
    );
  }

  deletePlan() {
    this.resourcesPlanService.deletePlan(this.data.plan).subscribe(
      rsp => {
        this.resourcesPlanService.planDeletedEvent$.next(this.data.plan);
        this.closeDialog();
      }
    );
  }

  exploreCreatePlan() {
    const plans: PlanDTO[] = JSON.parse(localStorage.getItem('plans'));
    const newPlan: PlanDTO = new PlanDTO(this.planForm.get('name').value, this.planForm.get('description').value);
    plans.push(newPlan);
    plans.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name) ? 0 : -1);
    localStorage.setItem('plans', JSON.stringify(plans));
    this.resourcesPlanService.planCreatedEvent$.next(newPlan);
    this.snackBarService.openSnackBar('"' + newPlan.name + '" was created.', 'OK');
    this.closeDialog();
  }

  exploreUpdatePlan() {
    const updatedPlanName = this.planForm.get('name').value;
    const updatedPlanDescription = this.planForm.get('description').value;
    const updatedPlan: PlanDTO = new PlanDTO(updatedPlanName, updatedPlanDescription);
    const plans: PlanDTO[] = JSON.parse(localStorage.getItem('plans'));
    const planIndex = plans.findIndex(x => x.name === this.data.plan.name);
    plans[planIndex] = new PlanDTO(updatedPlanName, updatedPlanDescription);
    plans.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name) ? 0 : -1);
    localStorage.setItem('plans', JSON.stringify(plans));
    this.snackBarService.openSnackBar('"' + updatedPlanName + '" was updated.', 'OK');
    this.resourcesPlanService.planUpdatedEvent$.next(updatedPlan);
    this.closeDialog();
  }

  exploreDeletePlan() {
    const plans: PlanDTO[] = JSON.parse(localStorage.getItem('plans'));
    const planIndex = plans.findIndex(x => x.name === this.data.plan.name);
    plans.splice(planIndex, 1);
    localStorage.setItem('plans', JSON.stringify(plans));
    this.snackBarService.openSnackBar('"' + this.data.plan.name + '" was deleted.', 'OK');
    this.resourcesPlanService.planDeletedEvent$.next(this.data.plan);
    this.closeDialog();
  }
}
