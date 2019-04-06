import {Component, Input, OnInit} from '@angular/core';
import {BookDTO, PlanDTO} from '../../../../shared/dto/dto.module';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {animate, query, sequence, stagger, state, style, transition, trigger} from '@angular/animations';
import {DialogService} from '../../../../shared/services/dialog/dialog.service';
import {exploreSampleBooks} from '../../explore.sample-data';

@Component({
  selector: 'app-explore-reading-plan-table',
  templateUrl: './explore-reading-plan-table.component.html',
  styleUrls: ['./explore-reading-plan-table.component.scss'],
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
export class ExploreReadingPlanTableComponent implements OnInit {
  @Input() currentPlan: PlanDTO;
  isLoading = true;
  bookDTOArray: any[] = [];
  toRead = [];
  reading = [];
  remove = [];
  done = [];
  dragging = false;
  inToReadZone = false;
  inReadingZone = false;
  inDoneZone = false;
  inRemoveZone = false;
  dropZoneState = 'hide';
  planActionsVisible = false;
  gearTurn = 'default';

  constructor(
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    const books: BookDTO[] = JSON.parse(localStorage.getItem('books'));
    if (books !== undefined && books !== null && books.length > 0) {
      this.bookDTOArray = this.toRead = books;
      this.isLoading = false;
    } else {
      // Load default sample library.
      this.bookDTOArray = this.toRead = exploreSampleBooks;
      localStorage.setItem('books', JSON.stringify(exploreSampleBooks));
      this.isLoading = false;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
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
    this.dialogService.openPlanDialog(this.currentPlan, 'EXPLORE_EDIT');
  }

  deletePlan() {
    this.dialogService.openPlanDialog(this.currentPlan, 'EXPLORE_DELETE');
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
    this.dialogService.openBookDetailsDialog(bookDTO, 'EXPLORE_PLAN');
  }
}
