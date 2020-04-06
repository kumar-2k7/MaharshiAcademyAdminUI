import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseStudiesService {

  constructor(private http: HttpService) { }

  getCaseStudyByChapterID(chapterID: number) {
    const req = {
      ID: chapterID
    }

    return this.http.postRequest(environment.apiUrl.GetCaseStudiesByChapterID, req);
  }

  deleteCaseStudy(caseStudyID: number) {
    const req = {
      CaseStudyID: caseStudyID
    }

    return this.http.postRequest(environment.apiUrl.DeleteCaseStudy, req);
  }

  insertCaseStudy(req) {
    return this.http.postRequest(environment.apiUrl.InsertCaseStudy, req);
  }
  
  updateCaseStudy(req) {
    return this.http.postRequest(environment.apiUrl.UpdateCaseStudy, req);
  }
}
