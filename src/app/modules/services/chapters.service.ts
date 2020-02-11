import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {

  constructor(private http: HttpService) { }

  getChaptersBySubjectID(id) {
    return this.http.getRequest(environment.apiUrl.GetChaptersBySubjectID + '?SubjectID=' + id);
  } 

  deleteChapter(chapterId: number) {
    const req = {
      ChapterID: chapterId,
    }
    return this.http.postRequest(environment.apiUrl.DeleteChapter, req);
  }

  updateChapter(req) {
    return this.http.postRequest(environment.apiUrl.UpdateChapter, req);
  }

  insertChapter(req) {
    return this.http.postRequest(environment.apiUrl.InsertChapter, req);
  }
}
