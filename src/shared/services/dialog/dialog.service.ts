import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {BookDTO, PlanDTO} from '../../dto/dto.module';
import {BookDetailsDialogComponent} from '../../dialogs/book-details-dialog/book-details-dialog.component';
import {ExploreFirstTimeDialogComponent} from '../../dialogs/explore-first-time-dialog/explore-first-time-dialog.component';
import {PlanDialogComponent} from '../../dialogs/plan-dialog/plan-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  openBookDetailsDialog(bookDTO: BookDTO, dialogType: string) {
    const dialogRef = this.dialog.open(BookDetailsDialogComponent, {
      width: '40em',
      autoFocus: false,
      panelClass: 'book-details-dialog',
      data: {
        book: bookDTO,
        type: dialogType
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The book details dialog was closed');
    });
  }

  openExploreFirstTimeDialog() {
    const dialogRef = this.dialog.open(ExploreFirstTimeDialogComponent, {
      width: '25em',
      autoFocus: false,
      panelClass: 'explore-first-time-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The explore first time dialog was closed');
    });
  }

  openPlanDialog(planDTO: PlanDTO, dialogType: string) {
    const dialogRef = this.dialog.open(PlanDialogComponent, {
      width: dialogType === 'DELETE' ? '20em' : '30em',
      autoFocus: false,
      panelClass: 'plan-dialog',
      data: {
        plan: planDTO,
        type: dialogType,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The plan dialog was closed');
    });
  }
}
