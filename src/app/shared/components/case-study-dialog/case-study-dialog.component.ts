import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LevelsService } from '@modules/services/levels.service';
import { IDifficultyLevelList } from '@shared/models/levels.interface';
import { DialogService } from '@shared/services/dialog.service';
import { Columns } from '@shared/models/table.interface';
import { QuestionsService } from '@modules/services/questions.service';

@Component({
  selector: 'app-case-study-dialog',
  templateUrl: './case-study-dialog.component.html',
  styleUrls: ['./case-study-dialog.component.css']
})
export class CaseStudyDialogComponent implements OnInit {

  public Editor = ClassicEditor;
  editorData: any = '';
  answerFormArray: FormArray;
  levels: IDifficultyLevelList[] = [];
  questions = [];
  difficultyLevel: FormControl = new FormControl('', Validators.required);
  actions = ['update', 'delete'];
  displayTable = false;
  columns: Columns[] = [
    {
      name: 'Question',
      property: 'QuestionDescription'
    }
  ];
  rows = [];

  constructor(public dialogRef: MatDialogRef<CaseStudyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private levelsService: LevelsService, private dialogService: DialogService,
    private questionService: QuestionsService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.levels = this.levelsService.getSaveDifficultyLevels();

    console.log(this.data);
    if (this.data.params.action === 'update') {
      this.editorData = this.data.params.row.CaseStudyDescription;
      this.difficultyLevel.setValue(this.data.params.row.DifficultyLevelID);
      this.addOptions();
    }
  }

  addNewOption() {
    this.displayTable = false;
    this.dialogService.questionDialog('case-study', {action: 'add'}).subscribe(res => {

      if (res.QuestionDescription) {
        res.index = this.rows.length;
        console.log(res);
        this.rows.push(res);
        this.displayTable = true;
      } else if (this.data.params.action === 'update') {
        this.displayTable = true;
      }
    });
  }

  addOptions() {
    this.data.params.row.Questions.map((data, index) => {
      data.index = index;
      data['Answer'] = data['Answers']
      this.rows.push(data);
      this.displayTable = true;
    })
  }

  action(event) {
    console.log(event);
    this.displayTable = false;
    if (event.action === 'update') {
      this.dialogService.questionDialog('case-study', event).subscribe(res => {
        if (res && res.QuestionDescription) {
          console.log(res);
          res.index = event.row.index;
          this.rows.splice(event.row.index, 1, res);
        }
        this.displayTable = true;
      });
    } else {
      this.rows.splice(event.row.index, 1);
      setTimeout(() => {
        this.displayTable = true;
      }, 1000);
      // this.displayTable = true;
    }
  }

  close(action?: string) {
    if (action === 'C') {
      this.dialogRef.close();
    } else {
      const req = {
        CaseStudyDescription: this.editorData,
        DifficultyLevelID: this.difficultyLevel.value,
        Question: this.rows
      }
      this.dialogRef.close(req);
    }
  }

}
