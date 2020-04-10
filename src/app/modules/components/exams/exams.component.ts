import { Component, OnInit } from '@angular/core';
import { MainCourseService } from '@modules/services/main-course.service';
import { MainCourseList, RootObject } from '@shared/models/main-course.interface';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ExamsService } from '@modules/services/exams.service';
import { IExams, ExamList } from '@shared/models/exams.interface';
import { Columns } from '@shared/models/table.interface';
import { DialogService } from '@shared/services/dialog.service';
import { ExamDialogComponent } from '@shared/components/exam-dialog/exam-dialog.component';
import { MatTableDataSource } from '@angular/material';
import { LevelsService } from '@modules/services/levels.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  allMainCourse: MainCourseList[];
  courseControl = new FormControl();
  filteredCourseOptions: Observable<MainCourseList[]>;
  selectedCourse: MainCourseList;
  rows: MatTableDataSource<ExamList> = new MatTableDataSource<ExamList>();
  actions = ['add', 'update', 'delete'];
  examDetailsList = [];
  isExamExist = false;
  changesMade = false;
  columns: Columns[] = [
    {
      name: 'Subject',
      property: 'SubjectName'
    },
    {
      name: 'Chapter',
      property: 'ChapterName'
    },
    {
      name: 'Level',
      property: 'LevelName'
    },
    {
      name: 'No. of Question(s)',
      property: 'QuestionCount'
    }
  ];
  constructor(private mainCourseService: MainCourseService, private examService: ExamsService,
    private dialogService: DialogService, private levelService: LevelsService) { }

  ngOnInit() {
    if (!this.mainCourseService.storeAllMainCourse) {
      this.mainCourseService.getMainCourseAll().subscribe((apiResponse: RootObject) => {
        if (apiResponse.Status === 'SUCCESS') {
          this.allMainCourse = apiResponse.MainCourseList;
        }
      })
    } else {
      this.allMainCourse = this.mainCourseService.storeAllMainCourse;
    }

    this.filteredCourseOptions = this.courseControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.allMainCourse.filter(option => option.CourseName.toLowerCase().includes(filterValue));
  }

  courseDisplayFn(value: any) {
    return value ? value.CourseName : '';
  }

  courseSelected(event) {
    this.changesMade = false;
    console.log(event);
    this.selectedCourse = event.option.value;
    this.examService.getExamsByCourseID(event.option.value.CourseID).subscribe((res: IExams) => {
      if (res.Status === 'SUCCESS') {
        console.log(res.MainCourseList);
        if (res.MainCourseList && res.MainCourseList[0] && res.MainCourseList[0].ExamList) {
          const rows = res.MainCourseList[0].ExamList;
          rows.map((data, i) => {
            data['index'] = i;
            data['LevelName'] = this.levelService.getLevelByLevelID(data.DifficultyLevelID).DifficultyLevelDescription;
          })
          this.rows.data = rows;
          this.isExamExist = true;
        } else {
          this.isExamExist = false;
        }
      } else {
        this.rows.data = [];
      }
    })
  }

  action(event) {
    if (event.action === 'delete') {
      this.rows.data.splice(event.row.index, 1);
      this.rows.data = this.rows.data;
    } else {
      this.dialogService.openDialog(ExamDialogComponent, event).subscribe(dialogCloseRes => {
        console.log('Dialog Closed', dialogCloseRes);

        if (dialogCloseRes) {
          this.changesMade = true;
          if (event.action === 'add') {
            this.rows.data.push(dialogCloseRes);
            this.rows.data = this.rows.data;
          } else {
            dialogCloseRes['index'] = event.row.index;
            this.rows.data.splice(event.row.index, 1, dialogCloseRes);
            this.rows.data = this.rows.data;
          }
        }
      });
    }
  }

  save() {
    const req = {
      "Exam": {
        "CourseID": this.selectedCourse.CourseID,
        "ExamDetailsList": this.rows.data
      }
    }
    if (!this.isExamExist) {
      this.examService.createExam(req).subscribe(res => {
        if (res['Status'] === 'SUCCESS') {
          this.courseSelected({ option: { value: this.selectedCourse } });
        }
      })
    } else {
      this.examService.updateExam(req).subscribe(res => {
        if (res['Status'] === 'SUCCESS') {
          this.courseSelected({ option: { value: this.selectedCourse } });
        }
      })
    }
  }

  delete() {
    this.examService.deleteExam(this.selectedCourse.CourseID).subscribe(res => {
      if (res['Status'] === 'SUCCESS') {
        this.courseSelected({ option: { value: this.selectedCourse } });
      }
    })
  }
}
