import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from '@modules/components/home/home.component';
import { AppRoutingModule } from './routing/app-routing/app-routing.module';
import { AppMaterialModule } from '@shared/modules/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { AddQuestionsComponent } from './modules/components/add-questions/add-questions.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpService } from '@shared/services/http/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './modules/components/login/login.component';
import { SubjectsComponent } from './modules/components/subjects/subjects.component';
import { LevelsComponent } from './modules/components/levels/levels.component';
import { ChaptersComponent } from './modules/components/chapters/chapters.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { TableComponent } from './shared/components/table/table.component';
import { MomentModule } from 'ngx-moment';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { Interceptor } from '@shared/services/http/interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { DropdownsComponent } from './shared/components/dropdowns/dropdowns.component';
import { CaseStudiesComponent } from './modules/components/case-studies/case-studies.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuestionsDialogComponent } from './shared/components/questions-dialog/questions-dialog.component';
import { CaseStudyDialogComponent } from './shared/components/case-study-dialog/case-study-dialog.component';
import { MainCourseComponent } from './modules/components/main-course/main-course.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    AddQuestionsComponent,
    LoginComponent,
    SubjectsComponent,
    LevelsComponent,
    ChaptersComponent,
    TabsComponent,
    TableComponent,
    DialogComponent,
    LoaderComponent,
    DropdownsComponent,
    CaseStudiesComponent,
    QuestionsDialogComponent,
    CaseStudyDialogComponent,
    MainCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    FormsModule,
    CKEditorModule
  ],
  entryComponents: [
    DialogComponent,
    QuestionsDialogComponent,
    CaseStudyDialogComponent
  ],
  providers: [
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
