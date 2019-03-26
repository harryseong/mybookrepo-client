import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-explore-first-time-dialog',
  templateUrl: './explore-first-time-dialog.component.html',
  styleUrls: ['./explore-first-time-dialog.component.scss']
})
export class ExploreFirstTimeDialogComponent implements OnInit {
  dontShowAgain = false;

  constructor(public dialogRef: MatDialogRef<ExploreFirstTimeDialogComponent>) { }

  ngOnInit() {}

  closeDialog() {
    if (this.dontShowAgain === true) {
      localStorage.setItem('dontShowAgain', 'true');
    }
    this.dialogRef.close();
  }
}
