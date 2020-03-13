import { Component, OnInit, Inject } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LevelsService } from '@modules/services/levels.service';
import { IDifficultyLevelList } from '@shared/models/levels.interface';
import { QuestionsService } from '@modules/services/questions.service';

@Component({
  selector: 'app-questions-dialog',
  templateUrl: './questions-dialog.component.html',
  styleUrls: ['./questions-dialog.component.css']
})
export class QuestionsDialogComponent implements OnInit {

  public Editor = ClassicEditor;
  editorData: any = '';
  answerFormArray: FormArray;
  levels: IDifficultyLevelList[] = [];
  difficultyLevel: FormControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<QuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private levelsService: LevelsService, private questionService: QuestionsService) { }

  ngOnInit() {
    this.levels = this.levelsService.getSaveDifficultyLevels();
    this.answerFormArray = new FormArray([]);
    console.log(this.data);
    if (this.data.params.action === 'update') {
      this.editorData = this.data.params.row.QuestionDescription;
      this.difficultyLevel.setValue(this.data.params.row.DifficultyLevelID);
      this.questionService.getAnswersByQuestionID(this.data.params.row.QuestionID).subscribe(res => {
        console.log(res);
        if (res['Status'] === 'SUCCESS') {
          res['AnswerList'].map(data => {
            this.addOption(data.AnswerDescription, data.IsCorrectAnswer);
          })
        }
      })
    }
  }

  addNewFormGroup() {
    this.answerFormArray.push(new FormGroup({
      AnswerDescription: new FormControl('', Validators.required),
      IsCorrectAnswer: new FormControl(false, Validators.required)
    }));
  }

  addOption(AnswerDescription: string, IsCorrectAnswer: boolean) {
    this.answerFormArray.push(new FormGroup({
      AnswerDescription: new FormControl(AnswerDescription, Validators.required),
      IsCorrectAnswer: new FormControl(IsCorrectAnswer, Validators.required)
    }));
  }

  removeFormGroup(i) {
    this.answerFormArray.removeAt(i);
  }

  close(action?: string) {
    if (action === 'C') {
      this.dialogRef.close();
    } else {
      const req = {
        QuestionDescription: this.editorData,
        DifficultyLevelID: this.difficultyLevel.value,
        Answer: this.answerFormArray.value
      }
      this.dialogRef.close(req);
    }

  }

}
