import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpService) { }

  getQuestionsByChapterID(chapterID) {
    const req = {
      ID: chapterID
    }
    return this.http.postRequest(environment.apiUrl.GetQuestionsByChapterID, req);
  }

  deleteQuestion(questionID: number) {
    const req = {
      QuestionID: questionID
    }

    return this.http.postRequest(environment.apiUrl.DeleteQuestion, req);
  }

  insertQuestion (req) {
    return this.http.postRequest(environment.apiUrl.InsertQuestion, req);
  }

  updateQuestion(req) {
    return this.http.postRequest(environment.apiUrl.UpdateQuestion, req);
  }

  getAnswersByQuestionID(id) {
   const req = {
    QuestionID: id
   };

   return this.http.postRequest(environment.apiUrl.GetAnswerByQuestionID, req);
  }
}
