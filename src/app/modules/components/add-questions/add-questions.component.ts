import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '@modules/services/questions.service';
import { Columns } from '@shared/models/table.interface';
import { IQuestion, IQuestions } from '@shared/models/questions.interface';
import { LevelsService } from '@modules/services/levels.service';
import { IDifficultyLevelList, ILevels } from '@shared/models/levels.interface';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  dropdowns = ['subject', 'chapter'];
  rows: IQuestion[];
  levels: IDifficultyLevelList[] = [];
  actions = ['add', 'update', 'delete'];

  columns: Columns[] = [
    {
      name: 'ID',
      property: 'QuestionID'
    },
    {
      name: 'Question',
      property: 'QuestionDescription'
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
  constructor(private questionsService: QuestionsService, private levelsService: LevelsService) { }

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
      this.questionsService.getQuestionsByChapterID(event.SelectionValue.ChapterID).subscribe((res: IQuestions) => {
        console.log(res.QuestionList);
        res.QuestionList.map((data: IQuestion, i) => {
          const level: IDifficultyLevelList = this.levels.find((a) => a.DifficultyLevelID === data.DifficultyLevelID);
          if (level) {
            data.DifficultyLevelDescription = level.DifficultyLevelDescription;
            if (i === 0) {
              this.rows = [];
            }
            this.rows.push(data);
          }
        })
      })
    }
  }

  action(event) {
    console.log(event);
    if (event.action === 'delete') {
      this.questionsService.deleteQuestion(event.row.QuestionID).subscribe((res: any) => {
        if (res.Status === 'SUCCESS') {
          this.selection({ SelectionType: 'chapter', SelectionValue: { ChapterID: event.row.ChapterID } });
        }
      })
    }
  }

}
