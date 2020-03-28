import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { QuestionsDialogComponent } from '@shared/components/questions-dialog/questions-dialog.component';
import { CaseStudyDialogComponent } from '@shared/components/case-study-dialog/case-study-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  updateDialog(from: 'subject' | 'chapter', data) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30vw',
      disableClose: true,
      data: {
        component: from,
        action: data
      }
    });
    return dialogRef.afterClosed();
  }

  questionDialog(from: 'question' | 'case-study', data) {
    const dialogRef = this.dialog.open(QuestionsDialogComponent, {
      maxHeight: '80vh',
      disableClose: true,
      data: {
        component: from,
        params: data
      }
    });
    return dialogRef.afterClosed();
  }

  caseStudyDialog(component, data) {
    const dialogRef = this.dialog.open(component, {
      maxHeight: '80vh',
      disableClose: true,
      data: {
        params: data
      }
    });
    return dialogRef.afterClosed();
  }
}
