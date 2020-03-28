import { Component, OnInit, Inject } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LevelsService } from '@modules/services/levels.service';
import { IDifficultyLevelList } from '@shared/models/levels.interface';
import { DialogService } from '@shared/services/dialog.service';
import { Columns } from '@shared/models/table.interface';

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
    @Inject(MAT_DIALOG_DATA) public data: any, private levelsService: LevelsService, private dialogService: DialogService) { }

  ngOnInit() {
    this.levels = this.levelsService.getSaveDifficultyLevels();

    console.log(this.data);
  }

  addNewOption() {
    this.displayTable = false;
    this.dialogService.questionDialog('question', this.data.params).subscribe(res => {
      if (res.QuestionDescription) {
        console.log(res);
        this.rows.push(res);

      }
      this.displayTable = true;
    });
  }

  action(event) {
    console.log(event);
    if (event.action === 'update') {
      this.dialogService.questionDialog('question', event).subscribe(res => {
        console.log(res);
        this.rows.push(res);
        this.displayTable = true;
      });
    }
  }

  close(action?: string) {
    if (action === 'C') {
      this.dialogRef.close();
    } else {
      const req = {
        CaseStudyDescription: this.editorData,
        DifficultyLevelID: this.difficultyLevel.value,
        Question: []
      }
      this.dialogRef.close(req);
    }
  }

}
