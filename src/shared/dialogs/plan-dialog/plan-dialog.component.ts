import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlanDTO} from '../../dto/dto.module';

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

  constructor(public dialogRef: MatDialogRef<PlanDialogComponent>) { }

  ngOnInit() {}

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
    this.closeDialog();
  }
}
