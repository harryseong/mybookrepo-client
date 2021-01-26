import {NgModule} from '@angular/core';

import {OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {PortalModule} from '@angular/cdk/portal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';

const materialModules = [
  OverlayModule,
  PortalModule,
  BidiModule,
  A11yModule,
  ObserversModule,
  BrowserAnimationsModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatButtonModule,
  MatCommonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSidenavModule,
  MatTabsModule,
  MatStepperModule,
  MatDividerModule,
  MatProgressBarModule,
  DragDropModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatListModule,
  MatChipsModule,
  MatBadgeModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {}
