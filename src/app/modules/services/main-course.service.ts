import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainCourseService {

  constructor(private http: HttpService) { }

  getMainCourseAll() {
    return this.http.postRequest(environment.apiUrl.GetMainCourseAll, {});
  }

  addMainCourse(req) {
    return this.http.postRequest(environment.apiUrl.InsertMainCourse, req);
  }
}
