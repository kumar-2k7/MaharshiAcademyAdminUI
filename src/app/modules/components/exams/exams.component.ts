import { Component, OnInit } from '@angular/core';
import { MainCourseService } from '@modules/services/main-course.service';
import { MainCourseList, RootObject } from '@shared/models/main-course.interface';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ExamsService } from '@modules/services/exams.service';
import { IExams, ExamList } from '@shared/models/exams.interface';
import { Columns } from '@shared/models/table.interface';

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
  rows: ExamList[];
  actions = ['add', 'update', 'delete'];
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
  constructor(private mainCourseService: MainCourseService, private examService: ExamsService) { }

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
    console.log(event);
    this.examService.getExamsByCourseID(event.option.value.CourseID).subscribe((res: IExams) => {
      if (res.Status === 'SUCCESS') {
        this.selectedCourse = event.option.value;
        console.log(res.MainCourseList);
        if (res.MainCourseList && res.MainCourseList[0] && res.MainCourseList[0].ExamList) {
          // res.MainCourseList[0].ExamList.map()
        }
      }
    })
  }
}
