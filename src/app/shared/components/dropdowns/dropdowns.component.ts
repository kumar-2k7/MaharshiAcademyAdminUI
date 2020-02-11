import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { HttpService } from '@shared/services/http/http.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { SubjectsList, Subjects } from '@shared/models/subjects.interface';
import { startWith, map } from 'rxjs/operators';
import { SubjectsService } from '@modules/services/subjects.service';
import { ChaptersService } from '@modules/services/chapters.service';
import { DialogService } from '@shared/services/dialog.service';
import { Observable } from 'rxjs';
import { Chapters, ChaptersList } from '@shared/models/chapters.interface';
import { ISelection } from '@shared/models/selection-emitter.interface';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.css']
})
export class DropdownsComponent implements OnInit {
  @Input() dropdowns: string[] = ['subject'];
  @Output() selection: EventEmitter<ISelection> = new EventEmitter<ISelection>();
  MainCourse = new FormControl();
  subjectControl = new FormControl();
  chapterControl = new FormControl();
  allSubjects: SubjectsList[];
  filteredSubjectOptions: Observable<SubjectsList[]>;
  filteredChapterOptions: Observable<ChaptersList[]>;
  showCourseDropdown = false;
  courses = [];
  displayChapters: ChaptersList[];
  constructor(private subjects: SubjectsService, private chapters: ChaptersService) { }

  ngOnInit() {
    if (this.subjects.getStoredSubjects()) {
      this.allSubjects = this.subjects.getStoredSubjects();
    } else {
      this.subjects.getAllSubjects().subscribe((response: Subjects) => {
        if (response.Status === 'SUCCESS') {
          this.allSubjects = response.SubjectList;
          this.subjects.storeSubjects(this.allSubjects);
        }
      })
    }
    this.filteredSubjectOptions = this.subjectControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredChapterOptions = this.chapterControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterChapter(value))
    )
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.allSubjects.filter(option => option.SubjectName.toLowerCase().includes(filterValue));
  }
  private _filterChapter(value: string) {
    const filterValue = value.toLowerCase();

    return this.displayChapters.filter(option => option.ChapterName.toLowerCase().includes(filterValue));
  }
  subjectDisplayFn(value: any) {
    return value ? value.SubjectName : '';
  }
  chapterDisplayFn(value: any) {
    return value ? value.ChapterName : '';
  }
  subjectSelected(event) {
    console.log(event);
    this.selection.emit({ 'SelectionType': 'chapter', SelectionValue: event});
    this.displayChapters = undefined;
    this.chapters.getChaptersBySubjectID(this.subjectControl.value.SubjectID).subscribe((response: Chapters) => {
      console.log(response);
      if (response.Status === 'SUCCESS') {
        this.selection.emit({ 'SelectionType': 'chapter', SelectionValue: this.subjectControl.value, SelectionResponse: response.ChapterList });
        if (this.dropdowns.includes('chapter')) {
          this.chapterControl.setValue('');
          this.displayChapters = response.ChapterList;
        }
      }
    })
  }

  chapterSelected(event) {
    console.log(event);
  }

}
