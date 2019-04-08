import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-gravatar-dialog',
  templateUrl: './gravatar-dialog.component.html',
  styleUrls: ['./gravatar-dialog.component.scss']
})
export class GravatarDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GravatarDialogComponent>) { }

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }
}
