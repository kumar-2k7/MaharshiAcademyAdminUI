import { Component, OnInit } from '@angular/core';
import { ICaseStudy, ICaseStudies } from '@shared/models/case-studies.interface';
import { CaseStudiesService } from '@modules/services/case-studies.service';
import { Columns } from '@shared/models/table.interface';

@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.css']
})
export class CaseStudiesComponent implements OnInit {
  dropdowns = ['subject', 'chapter'];
  rows: ICaseStudy[];
  actions = ['add', 'update', 'delete'];
  columns: Columns[] = [
    {
      name: 'ID',
      property: 'CaseStudyID'
    },
    {
      name: 'Question',
      property: 'CaseStudyDescription'
    },
    {
      name: 'Difficulty',
      property: 'DifficultyLevelID'
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
  constructor(private caseStudyService: CaseStudiesService) { }

  ngOnInit() {
  }

  selection(event) {
    console.log(event);
    if (event.SelectionType === 'chapter') {
      this.caseStudyService.getCaseStudyByChapterID(event.SelectionValue.ChapterID).subscribe((res: ICaseStudies) => {
        this.rows = res.CaseStudyList;
      });
    }
  }

  action(event) {
    console.log(event);
    if (event.action === 'delete') {
      this.caseStudyService.deleteCaseStudy(event.row.CaseStudyID).subscribe((res: any) => {
        if (res.Status === 'SUCCESS') {
          this.selection({ SelectionType: 'chapter', SelectionValue: { ChapterID: event.row.ChapterID } });
        }
      })
    }
  }

}
