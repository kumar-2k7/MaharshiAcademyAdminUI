import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChaptersList } from '@shared/models/chapters.interface';
import { SubjectsList } from '@shared/models/subjects.interface';
import { LevelsService } from '@modules/services/levels.service';
import { IDifficultyLevelList } from '@shared/models/levels.interface';
import { FormControl, Validators } from '@angular/forms';
import { DropdownsComponent } from '../dropdowns/dropdowns.component';
import { SubjectsService } from '@modules/services/subjects.service';

@Component({
  selector: 'app-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.css']
})
export class ExamDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(DropdownsComponent) dropdownComponent: DropdownsComponent;
  dropdowns = ['subject', 'chapter'];
  selectedChapter: ChaptersList;
  selectedSubject: SubjectsList;
  levels: IDifficultyLevelList[] = [];
  difficultyLevel: FormControl = new FormControl('', Validators.required);
  NumberOfQuestions: FormControl = new FormControl('', Validators.required);
  firstTime = true;
  constructor(public dialogRef: MatDialogRef<ExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private levelsService: LevelsService,
    private subjectService: SubjectsService) { }

  ngOnInit() {
    this.levels = this.levelsService.getSaveDifficultyLevels();
  }

  ngAfterViewInit() {
    if (this.data.params.action === 'update') {
      const subjects = this.subjectService.getStoredSubjects();
      const selectedSubject = subjects.find(a => a.SubjectID === this.data.params.row.SubjectID);
      this.dropdownComponent.subjectControl.setValue(selectedSubject);
      this.dropdownComponent.subjectSelected({ SelectedValue: selectedSubject });
      this.difficultyLevel.setValue(this.data.params.row.DifficultyLevelID);
      this.NumberOfQuestions.setValue(this.data.params.row.QuestionCount);
    }
  }

  close(type) {
    switch (type) {
      case 'C': this.dialogRef.close();
        break;
      case 'A': this.addUpdateValue();
        break;
    }
  }

  addUpdateValue() {
    const addReq = {
      "SubjectID": this.selectedSubject.SubjectID,
      "ChapterID": this.selectedChapter.ChapterID,
      "SubjectName": this.selectedSubject.SubjectName,
      "ChapterName": this.selectedChapter.ChapterName,
      "DifficultyLevelID": this.difficultyLevel.value,
      "LevelName": this.levelsService.getLevelByLevelID(this.difficultyLevel.value).DifficultyLevelDescription,
      "QuestionCount": Number(this.NumberOfQuestions.value),
      "IsGroupQuestion": true
    }
    this.dialogRef.close(addReq);
  }

  selection(event) {
    console.log(event);
    if (event.SelectionType === 'chapter') {
      this.selectedChapter = event.SelectionValue;
    } else {
      this.selectedSubject = event.SelectionValue;
      this.selectedChapter = undefined;
      if (this.data.params.action === 'update' && event.SelectionResponse && this.firstTime) {
        const chapterSelected = event.SelectionResponse.find(a => a.ChapterID === this.data.params.row.ChapterID);
        setTimeout(() => this.dropdownComponent.chapterControl.setValue(chapterSelected), 500);
        this.selectedChapter = chapterSelected;
        this.firstTime = false;
      }
    }
  }

}
