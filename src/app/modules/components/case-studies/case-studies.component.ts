import { Component, OnInit } from '@angular/core';
import { ICaseStudy, ICaseStudies } from '@shared/models/case-studies.interface';
import { CaseStudiesService } from '@modules/services/case-studies.service';
import { Columns } from '@shared/models/table.interface';
import { LevelsService } from '@modules/services/levels.service';
import { IDifficultyLevelList, ILevels } from '@shared/models/levels.interface';
import { ChaptersList } from '@shared/models/chapters.interface';
import { DialogService } from '@shared/services/dialog.service';
import { CaseStudyDialogComponent } from '@shared/components/case-study-dialog/case-study-dialog.component';
import { SubjectsList } from '@shared/models/subjects.interface';

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
  selectedChapter: ChaptersList;
  selectedSubject: SubjectsList;
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
  constructor(private caseStudyService: CaseStudiesService, private levelsService: LevelsService,
    private dialogService: DialogService) { }

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
      this.selectedChapter = event.SelectionValue;
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
    } else {
      this.selectedSubject = event.SelectionValue;
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
    } else {
      this.dialogService.openDialog(CaseStudyDialogComponent, event).subscribe(dialogResponse => {
        console.log(dialogResponse);
        if (dialogResponse.CaseStudyDescription) {
          const req = {
            CaseStudy: {
              ChapterID: this.selectedChapter.ChapterID,
              SubjectID: this.selectedSubject.SubjectID,
              ...dialogResponse
            }
          }
          console.log('Request ::', req);
          if (event.action === 'add') {
            this.caseStudyService.insertCaseStudy(req).subscribe(res => {
              if (res['Status'] === 'SUCCESS') {
                this.selection({ SelectionType: 'chapter', SelectionValue: this.selectedChapter })
              }
            })
          } else {
            req.CaseStudy['CaseStudyID'] = event.row.CaseStudyID;
            this.caseStudyService.updateCaseStudy(req).subscribe(res => {
              if (res['Status'] === 'SUCCESS') {
                this.selection({ SelectionType: 'chapter', SelectionValue: this.selectedChapter })
              }
            })
          }
        }
      });
    }
  }

}
