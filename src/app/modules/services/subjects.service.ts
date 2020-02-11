import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { environment } from 'src/environments/environment';
import { Subjects, SubjectsList } from '@shared/models/subjects.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private subjects: SubjectsList[] = undefined;
  constructor(private http: HttpService) { }

  getAllSubjects() {
    return this.http.postRequest(environment.apiUrl.GetAllSubjects, {});
  }

  getStoredSubjects() {
    return this.subjects;
  }

  storeSubjects(subjects: SubjectsList[]) {
    this.subjects = subjects;
  }

  deleteSubject(id) {
    const req = {
      SubjectID: id
    }
    return this.http.postRequest(environment.apiUrl.DeleteSubject, req);
  }

  updateSubject(id, name) {
    const req = {
      SubjectID: id,
      SubjectName: name
    }

    return this.http.postRequest(environment.apiUrl.UpdateSubject, req)
  }

  insertSubject(name) {
    const req = {
      SubjectName: name
    }

    return this.http.postRequest(environment.apiUrl.InsertSubject, req)
  }
}
