import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  updateDialog(from: 'subject' | 'chapter', data) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30vw',
      data: {
        component: from,
        action: data
      }
    });
    return dialogRef.afterClosed();
  }
}
