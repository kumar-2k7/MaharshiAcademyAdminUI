import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '@modules/services/subjects.service';
import { Subjects, SubjectsList } from '@shared/models/subjects.interface';
import { Columns } from '@shared/models/table.interface';
import { DialogService } from '@shared/services/dialog.service';
import { P } from '@angular/core/src/render3';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  rows: SubjectsList[];
  actions = ['add', 'update', 'delete'];
  columns: Columns[] = [
    {
      name: 'ID',
      property: 'SubjectID'
    },
    {
      name: 'Name',
      property: 'SubjectName'
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

  constructor(private subjects: SubjectsService, private dialog: DialogService) { }

  ngOnInit() {
    this.getSubjects();
  }

  action(event) {
    console.log('Subject Cell Clicked', event)
    if (event.action === 'delete') {
      this.subjects.deleteSubject(event.row.SubjectID).subscribe(res => {
        if (res['Status'] === 'SUCCESS') {
          this.getSubjects();
        }
      })
    } else {
      this.dialog.updateDialog('subject', event).subscribe(res => {
        if (event.action === 'update' && res.inputValue) {
          this.subjects.updateSubject(event.row.SubjectID, res.inputValue).subscribe(res => {
            this.getSubjects();
          })
        } else if (res.inputValue) {
          this.subjects.insertSubject(res.inputValue).subscribe(res => {
            this.getSubjects();
          })
        }
      })
    }
  }

  getSubjects() {
    this.rows = undefined;
    this.subjects.getAllSubjects().subscribe((res: Subjects) => {
      if (res.Status === 'SUCCESS') {
        this.rows = res.SubjectList;
        this.subjects.storeSubjects(res.SubjectList);
      }
    });
  }

}
