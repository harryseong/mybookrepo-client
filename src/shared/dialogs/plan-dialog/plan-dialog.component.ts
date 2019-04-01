import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlanDTO} from '../../dto/dto.module';
import {ResourcesApiService} from '../../services/api/resources/resources-api.service';
import {SnackBarService} from '../../services/snackBar/snack-bar.service';

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
    private resourcesApiService: ResourcesApiService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data.type === 'EDIT') {
      this.planForm.get('name').setValue(this.data.plan.name);
      this.planForm.get('description').setValue(this.data.plan.description);
    }
  }

  closeDialog() {
    this.planForm.reset();
    this.dialogRef.close();
  }

  createPlan() {
    const plans: PlanDTO[] = JSON.parse(localStorage.getItem('plans'));
    const newPlan: PlanDTO = new PlanDTO(this.planForm.get('name').value, this.planForm.get('description').value);
    plans.push(newPlan);
    plans.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name) ? 0 : -1);
    localStorage.setItem('plans', JSON.stringify(plans));
    this.resourcesApiService.$planCreatedEvent.next(newPlan.name);
    this.snackBarService.openSnackBar('"' + newPlan.name + '" was created.', 'OK');
    this.closeDialog();
  }

  updatePlan(planDTO: PlanDTO) {
    const updatedPlanName = this.planForm.get('name').value;
    const updatedPlanDescription = this.planForm.get('description').value;
    const plans: PlanDTO[] = JSON.parse(localStorage.getItem('plans'));
    const planIndex = plans.findIndex(x => x.name === planDTO.name);
    plans[planIndex] = new PlanDTO(updatedPlanName, updatedPlanDescription);
    plans.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name) ? 0 : -1);
    localStorage.setItem('plans', JSON.stringify(plans));
    this.snackBarService.openSnackBar('"' + updatedPlanName + '" was updated.', 'OK');
    this.resourcesApiService.$planUpdatedEvent.next(updatedPlanName);
    this.closeDialog();
  }

  deletePlan(planDTO: PlanDTO) {
    const plans: PlanDTO[] = JSON.parse(localStorage.getItem('plans'));
    const planIndex = plans.findIndex(x => x.name === planDTO.name);
    plans.splice(planIndex, 1);
    localStorage.setItem('plans', JSON.stringify(plans));
    this.snackBarService.openSnackBar('"' + planDTO.name + '" was deleted.', 'OK');
    this.resourcesApiService.$planDeletedEvent.next();
    this.closeDialog();
  }
}
