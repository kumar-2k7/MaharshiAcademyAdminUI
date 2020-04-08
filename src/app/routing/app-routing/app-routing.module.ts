import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@modules/components/dashboard/dashboard.component';
import { AddQuestionsComponent } from '@modules/components/add-questions/add-questions.component';
import { LoginComponent } from '@modules/components/login/login.component';
import { HomeComponent } from '@modules/components/home/home.component';
import { SubjectsComponent } from '@modules/components/subjects/subjects.component';
import { ChaptersComponent } from '@modules/components/chapters/chapters.component';
import { CaseStudiesComponent } from '@modules/components/case-studies/case-studies.component';
import { MainCourseComponent } from '@modules/components/main-course/main-course.component';
import { MainCourseAddUpdateComponent } from '@modules/components/main-course-add-update/main-course-add-update.component';

const appRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'questions', component: AddQuestionsComponent },
      { path: 'case-studies', component: CaseStudiesComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'chapters', component: ChaptersComponent },
      { path: 'main-course', component: MainCourseComponent },
      { path: 'main-course-update', component: MainCourseAddUpdateComponent },
    ]
  },
  { path: '', component: LoginComponent }
]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
