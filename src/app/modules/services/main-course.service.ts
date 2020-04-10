import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { environment } from 'src/environments/environment';
import { MainCourseList } from '@shared/models/main-course.interface';

@Injectable({
  providedIn: 'root'
})
export class MainCourseService {
  storedCourse: MainCourseList;
  storeAllMainCourse: MainCourseList[];
  constructor(private http: HttpService) { }

  getMainCourseAll() {
    return this.http.postRequest(environment.apiUrl.GetMainCourseAll, {});
  }

  addMainCourse(req) {
    return this.http.postRequest(environment.apiUrl.InsertMainCourse, req);
  }

  getStoredCourse(): MainCourseList {
    return this.storedCourse;
  }
}
