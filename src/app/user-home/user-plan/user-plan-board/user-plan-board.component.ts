import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BookDTO, PlanDTO} from '../../../../shared/dto/dto.module';
import {DialogService} from '../../../../shared/services/dialog/dialog.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {animate, query, sequence, stagger, state, style, transition, trigger} from '@angular/animations';
import {UserService} from '../../../../shared/services/user/user.service';
import {ResourcesPlanService} from '../../../../shared/services/api/resources/plan/resources-plan.service';
import {Subscription} from 'rxjs';
import {SnackBarService} from '../../../../shared/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-user-plan-board',
  templateUrl: './user-plan-board.component.html',
  styleUrls: ['./user-plan-board.component.scss'],
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
    ]),
    trigger('planGearAnimations', [
      state('default', style({ transform: 'rotate(0)'})),
      state('turned', style({ transform: 'rotate(45deg)'})),

      transition('* => *', [
        animate('0.3s ease')
      ])
    ]),
    trigger('planActionAnimations', [
      transition(':enter', [
        query('.plan-action-btn', [
          style({ opacity: 0, transform: 'translateX(-3em) rotate(-90deg)'}),
          stagger(100, [
            sequence([
              animate('0.2s ease', style({ opacity: 1, transform: 'translateX(0)' })),
            ])
          ])
        ])
      ]),
      transition(':leave', [
        query('.plan-action-btn', [
          style({ opacity: 1}),
          stagger(-100, [
            sequence([
              animate('0.2s ease', style({ opacity: 0, transform: 'translateX(-3em) rotate(-90deg)' })),
            ])
          ])
        ])
      ]),
    ]),
    trigger('dropZoneAnimations', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 0.95, transform: 'translateY(-1em)' })),

      transition('hide => show', [
        animate('0.3s ease')
      ]),

      transition('show => hide', [
        query('.drop-zone', [
          stagger('80ms', [
            sequence([
              animate('0.3s ease', style({ opacity: 0, transform: 'translateX(10em)' })),
            ])
          ]),
        ])
      ]),
    ]),
    trigger('dropZoneIconAnimations', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-1em)'}),
        animate('0.3s ease', style({ opacity: 1, transform: 'none' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'none'}),
        animate('0.3s ease', style({ opacity: 0, transform: 'translateX(-1em)' })),
      ])
    ])
  ]
})
export class UserPlanBoardComponent implements OnInit, OnDestroy {
  @Input() currentPlan: PlanDTO;
  @Input() toRead = [];
  @Input() reading = [];
  @Input() done = [];
  remove = [];

  dragging = false;
  inToReadZone = false;
  inReadingZone = false;
  inDoneZone = false;
  inRemoveZone = false;
  dropZoneState = 'hide';
  planActionsVisible = false;
  gearTurn = 'default';

  bookRemovedFromPlan$: Subscription;

  constructor(
    private dialogService: DialogService,
    private resourcesPlanService: ResourcesPlanService,
    private snackBarService: SnackBarService,
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.bookRemovedFromPlan$ = this.resourcesPlanService.bookRemovedFromPlanEvent$.subscribe(
      (bookDTO: BookDTO) => this.snackBarService.openSnackBar('"' + bookDTO.title + '" was removed from the plan.', 'OK')
    );
  }

  ngOnDestroy(): void {
    this.bookRemovedFromPlan$.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>, droppedIn: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const bookDTO: BookDTO = event.item.data;

      switch (droppedIn) {
        case('TO_READ'): {
          this.resourcesPlanService.updateBookInPlan(this.currentPlan.id, bookDTO.id, '0').subscribe(
            () => {
              console.log(bookDTO.title + ' status updated to TO_READ.');
            }
          );
          break;
        }
        case('READING'): {
          this.resourcesPlanService.updateBookInPlan(this.currentPlan.id, bookDTO.id, '1').subscribe(
            () => {
              console.log(bookDTO.title + ' status updated to READING.');
            }
          );
          break;
        }
        case('DONE'): {
          this.resourcesPlanService.updateBookInPlan(this.currentPlan.id, bookDTO.id, '2').subscribe(
            () => {
              console.log(bookDTO.title + ' status updated to DONE.');
            }
          );
          break;
        }
        case('REMOVE'): {
          this.resourcesPlanService.removeBookFromPlan(this.currentPlan.id, bookDTO.id).subscribe(
            () => {
              console.log(bookDTO.title + 'removed from plan.');
              this.resourcesPlanService.bookRemovedFromPlan(bookDTO);
            }
          );
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  togglePlanActions() {
    this.planActionsVisible = !this.planActionsVisible;
    this.gearTurn = this.gearTurn === 'default' ? 'turned' : 'default';
  }

  dragStarted() {
    this.dragging = true;
    this.dropZoneState = 'show';
    console.log('Drag started: ' + this.dropZoneState);
  }

  dragEnded() {
    this.dragging = false;
    this.inToReadZone = this.inReadingZone = this.inDoneZone = this.inRemoveZone = false;
    this.dropZoneState = 'hide';
    console.log('Drag ended: ' + this.dropZoneState);
  }

  editPlan() {
    this.dialogService.openPlanDialog(this.currentPlan, 'EDIT');
  }

  deletePlan() {
    this.dialogService.openPlanDialog(this.currentPlan, 'DELETE');
  }

  enteredToReadZone() {
    this.inToReadZone = true;
  }

  leftToReadZone() {
    this.inToReadZone = false;
  }

  enteredReadingZone() {
    this.inReadingZone = true;
  }

  leftReadingZone() {
    this.inReadingZone = false;
  }

  enteredDoneZone() {
    this.inDoneZone = true;
  }

  leftDoneZone() {
    this.inDoneZone = false;
  }

  enteredRemoveZone() {
    this.inRemoveZone = true;
  }

  leftRemoveZone() {
    this.inRemoveZone = false;
  }

  openBookDetailsDialog(bookDTO: BookDTO) {
    this.dialogService.openBookDetailsDialog(bookDTO, 'PLAN');
  }
}
