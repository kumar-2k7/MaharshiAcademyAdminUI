import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MainCourseService } from '@modules/services/main-course.service';

@Component({
  selector: 'app-main-course-add-update',
  templateUrl: './main-course-add-update.component.html',
  styleUrls: ['./main-course-add-update.component.css']
})
export class MainCourseAddUpdateComponent implements OnInit {
  CourseGroup: FormGroup;
  constructor(private router: Router, private mainCourseService: MainCourseService) { }

  ngOnInit() {
    this.CourseGroup = new FormGroup({
      CourseName: new FormControl('', Validators.required),
      CourseDescription: new FormControl('', Validators.required),
      QuestionCount: new FormControl('', Validators.required),
      CorrectAnswerWeightage: new FormControl('', Validators.required),
      WrongAnswerWeightage: new FormControl('', Validators.required),
      ExamTimeDuration: new FormControl('', Validators.required),
    })
  }

  submit(type) {
    switch (type) {
      case 'C': this.router.navigate(['/home/main-course']);
        break;
      case 'S': {
        const req = {
          MainCourse: this.CourseGroup.value
        }
        this.mainCourseService.addMainCourse(req).subscribe((res: any) => {
          if (res.Status === 'SUCCESS') {
            this.router.navigate(['/home/main-course']);
        }
      })
    }
    break;
  }
} 

}
