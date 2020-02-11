import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  inputValue = '';
  maxListOrder = [];
  listOrderValue = 0;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('Dialog Data', this.data)
    if (this.data.action.row !== null) {
      switch (this.data.component) {
        case 'subject': this.inputValue = this.data.action.row.SubjectName;
          break;
        case 'chapter': this.inputValue = this.data.action.row.ChapterName;
          break;
      }
    } else {
      switch (this.data.component) {
        case 'chapter': {
          for (let i = 0; i < this.data.action.maxListOrder; i++) {
            this.maxListOrder.push(i + 1);
          }
          this.listOrderValue = this.data.action.maxListOrder;
        }
          break;
      }
    }
  }
  close() {
    const val = {
      inputValue: this.inputValue,
      listOrderValue: this.listOrderValue
    }
    this.dialogRef.close(val);
  }
}
