import { Component, OnInit } from '@angular/core';
import { MainCourseService } from '@modules/services/main-course.service';
import { RootObject, MainCourseList } from '@shared/models/main-course.interface';
import { Columns } from '@shared/models/table.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-course',
  templateUrl: './main-course.component.html',
  styleUrls: ['./main-course.component.css']
})
export class MainCourseComponent implements OnInit {

  rows: MainCourseList[];
  actions = ['add', 'update', 'delete'];
  columns: Columns[] = [
    {
      name: 'ID',
      property: 'CourseID'
    },
    {
      name: 'Name',
      property: 'CourseName'
    },
    {
      name: 'Description',
      property: 'CourseDescription'
    },
    {
      name: 'Questions',
      property: 'QuestionCount'
    },
    // {
    //   name: 'Marks',
    //   property: ''
    // },
    {
      name: 'Marking',
      property: 'CorrectAnswerWeightage'
    },
    {
      name: 'Duration',
      property: 'ExamTimeDuration'
    }
  ];

  constructor(private mainCourseService: MainCourseService, private router: Router) { }

  ngOnInit() {
    this.mainCourseService.getMainCourseAll().subscribe((apiResponse: RootObject) => {
      if (apiResponse.Status === 'SUCCESS') {
        console.log(apiResponse);
        this.rows = apiResponse.MainCourseList;
      }
    })
  }

  action(event) {
    console.log(event);
    if (event.action === 'add') {
      this.router.navigate(['/home/main-course-update']);
    }
  }

}
