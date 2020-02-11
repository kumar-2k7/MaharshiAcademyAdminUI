import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatInputModule,
  MatTabsModule,
  MatTableModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ],
  declarations: []
})
export class AppMaterialModule { }
