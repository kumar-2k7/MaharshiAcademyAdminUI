import { Component, OnInit } from '@angular/core';
import { ICaseStudy, ICaseStudies } from '@shared/models/case-studies.interface';
import { CaseStudiesService } from '@modules/services/case-studies.service';
import { Columns } from '@shared/models/table.interface';
import { LevelsService } from '@modules/services/levels.service';
import { IDifficultyLevelList, ILevels } from '@shared/models/levels.interface';

@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.css']
})
export class CaseStudiesComponent implements OnInit {
  dropdowns = ['subject', 'chapter'];
  rows: ICaseStudy[];
  actions = ['add', 'update', 'delete'];
  levels: IDifficultyLevelList[] = [];
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
      property: 'DifficultyLevelDescription'
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
  constructor(private caseStudyService: CaseStudiesService, private levelsService: LevelsService) { }

  ngOnInit() {
    this.levels = this.levelsService.getSaveDifficultyLevels();
    if (!this.levels.length) {
      this.levelsService.getAllDifficultyLevelsCall().subscribe((res: ILevels) => {
        if (res.Status === 'SUCCESS') {
          this.levels = res.DifficultyLevelList;
          this.levelsService.saveDifficultyLevels(this.levels);
        }
      });
    }
  }

  selection(event) {
    console.log(event);
    if (event.SelectionType === 'chapter') {
      this.caseStudyService.getCaseStudyByChapterID(event.SelectionValue.ChapterID).subscribe((res: ICaseStudies) => {
        res.CaseStudyList.map((data: ICaseStudy, i) => {
          const level: IDifficultyLevelList = this.levels.find((a) => a.DifficultyLevelID === data.DifficultyLevelID);
          if (level) {
            data.DifficultyLevelDescription = level.DifficultyLevelDescription;
            if (i === 0) {
              this.rows = [];
            }
            this.rows.push(data);
          }
        })
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
