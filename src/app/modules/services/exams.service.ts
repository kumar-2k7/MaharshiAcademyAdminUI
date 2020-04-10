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
}
