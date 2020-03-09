import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { QuestionsDialogComponent } from '@shared/components/questions-dialog/questions-dialog.component';

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

  questionDialog(from: 'question', data) {
    const dialogRef = this.dialog.open(QuestionsDialogComponent, {
      disableClose: true,
      data: {
        component: from,
        params: data
      }
    });
    return dialogRef.afterClosed();
  }
}
