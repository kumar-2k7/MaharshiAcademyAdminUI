import { Component, OnInit, Inject } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-questions-dialog',
  templateUrl: './questions-dialog.component.html',
  styleUrls: ['./questions-dialog.component.css']
})
export class QuestionsDialogComponent implements OnInit {

  public Editor = ClassicEditor;
  editorData: any = '';
  answerFormArray: FormArray;

  constructor(public dialogRef: MatDialogRef<QuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.params.action === 'update') {
      this.editorData = this.data.params.row.QuestionDescription;
    }
    this.answerFormArray = new FormArray([])
  }

  addNewFormGroup() {
    this.answerFormArray.push(new FormGroup({
      AnswerDescription: new FormControl('', Validators.required),
      IsCorrectAnswer: new FormControl(false, Validators.required)
    }));
  }

  removeFormGroup(i) {
    this.answerFormArray.removeAt(i);
  }

  close(action?: string) {
    if (action === 'C') {
      this.dialogRef.close();
    } else {
      this.dialogRef.close(this.editorData);
    }

  }

}
