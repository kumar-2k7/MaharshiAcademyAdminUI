import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private http: HttpService) { }

  getExamsByCourseID(courseID: number) {
    const req = {
      CourseID: courseID
    };

    return this.http.postRequest(environment.apiUrl.GetExamByCourseID, req);
  }

  createExam(req) {
    return this.http.postRequest(environment.apiUrl.CreateExam, req);
  }

  deleteExam(courseID: number) {
    const req = {
      Exam: {
        CourseID: courseID
      }
    }
    return this.http.postRequest(environment.apiUrl.DeleteExam, req);
  }

  updateExam(req) {
    return this.http.postRequest(environment.apiUrl.UpdateExam, req);
  }
}
