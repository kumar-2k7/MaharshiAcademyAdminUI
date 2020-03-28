import { Component, OnInit, Inject } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LevelsService } from '@modules/services/levels.service';
import { IDifficultyLevelList } from '@shared/models/levels.interface';
import { QuestionsService } from '@modules/services/questions.service';
import { DialogService } from '@shared/services/dialog.service';

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
  caseStudy = false;

  constructor(public dialogRef: MatDialogRef<QuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private levelsService: LevelsService, private questionService: QuestionsService) { }

  ngOnInit() {
    this.levels = this.levelsService.getSaveDifficultyLevels();
    this.answerFormArray = new FormArray([]);

    if (this.data.params.action === 'update') {
        this.updateQuestion();
    }
  }

  addNewOption() {

      this.answerFormArray.push(new FormGroup({
        AnswerDescription: new FormControl('', Validators.required),
        IsCorrectAnswer: new FormControl(false, Validators.required),
        AnswerID: new FormControl(0)
      }));
  }

  addOption(AnswerDescription: string, IsCorrectAnswer: boolean, AnswerID = 0) {
    this.answerFormArray.push(new FormGroup({
      AnswerDescription: new FormControl(AnswerDescription, Validators.required),
      IsCorrectAnswer: new FormControl(IsCorrectAnswer, Validators.required),
      AnswerID: new FormControl(AnswerID)
    }));
  }

  updateQuestion() {
    this.editorData = this.data.params.row.QuestionDescription;
    this.difficultyLevel.setValue(this.data.params.row.DifficultyLevelID);
    this.questionService.getAnswersByQuestionID(this.data.params.row.QuestionID).subscribe(res => {
      console.log(res);
      if (res['Status'] === 'SUCCESS') {
        res['AnswerList'].map(data => {
          this.addOption(data.AnswerDescription, data.IsCorrectAnswer, data.AnswerID);
        })
      }
    })
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
