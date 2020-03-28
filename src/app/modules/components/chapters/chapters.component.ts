import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SubjectsService } from '@modules/services/subjects.service';
import { SubjectsList, Subjects } from '@shared/models/subjects.interface';
import { ChaptersService } from '@modules/services/chapters.service';
import { Chapters, ChaptersList } from '@shared/models/chapters.interface';
import { Columns } from '@shared/models/table.interface';
import { DialogService } from '@shared/services/dialog.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  subjectControl = new FormControl();
  allSubjects: SubjectsList[];
  displayChapters: ChaptersList[];
  isSubjectSelected = false;
  filteredOptions: Observable<SubjectsList[]>;
  actions = ['add', 'update', 'delete'];
  columns: Columns[] = [
    {
      name: 'ID',
      property: 'ChapterID'
    },
    {
      name: 'Name',
      property: 'ChapterName'
    },
    {
      name: 'Created On',
      property: 'CreatedDate'
    },
    {
      name: 'Created By',
      property: 'CreatedBy'
    },
    {
      name: 'Modified On',
      property: 'ModifiedDate'
    },
    {
      name: 'Modified By',
      property: 'ModifiedBy'
    }
  ];
  constructor(private subjects: SubjectsService, private chapters: ChaptersService, private dialogService: DialogService) { }


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
    this.filteredOptions = this.subjectControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.allSubjects.filter(option => option.SubjectName.toLowerCase().includes(filterValue));
  }

  subjectDisplayFn(value: any) {
    return value ? value.SubjectName : '';
  }

  subjectSelected(event) {
    console.log(event);
    this.isSubjectSelected = true;
    this.displayChapters = [];
    this.chapters.getChaptersBySubjectID(this.subjectControl.value.SubjectID).subscribe((response: Chapters) => {
      console.log(response);
      if (response.Status === 'SUCCESS') {
        this.displayChapters = response.ChapterList;
      }
    })
  }

  action(event) {
    console.log(event);
    if (event.action === 'delete') {
      this.chapters.deleteChapter(event.row.ChapterID).subscribe(res => {
        this.subjectSelected(event);
      });
    } else {
      if (event.action === 'add') {
        event.maxListOrder = this.displayChapters.length + 1;
      }
      this.dialogService.updateDialog('chapter', event).subscribe(res => {
        console.log(res);
        if (event.action === 'update' && res.inputValue) {
          const req = {
            "ChapterID": event.row.ChapterID,
            "SubjectID": event.row.SubjectID,
            "ListOrder": event.row.ListOrder,
            "ChapterName": res.inputValue,
          }
          this.chapters.updateChapter(req).subscribe(res => {
            this.subjectSelected(event);
          })
        } else if (res.inputValue) {
          const req = {
            "SubjectID": this.subjectControl.value.SubjectID,
            "ListOrder": res.listOrderValue,
            "ChapterName": res.inputValue
          }
          this.chapters.insertChapter(req).subscribe(res => {
            this.subjectSelected(event);
          })
        }
      });
    }
  }

}
