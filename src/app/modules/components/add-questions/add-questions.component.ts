import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '@modules/services/questions.service';
import { Columns } from '@shared/models/table.interface';
import { IQuestion, IQuestions } from '@shared/models/questions.interface';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  dropdowns = ['subject', 'chapter'];
  rows: IQuestion[];
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
  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
  }
  selection(event) {
    console.log(event);
    if (event.SelectionType === 'chapter') {
      this.questionsService.getQuestionsByChapterID(event.SelectionValue.ChapterID).subscribe((res: IQuestions) => {
        console.log(res.QuestionList);
        this.rows = res.QuestionList;
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
