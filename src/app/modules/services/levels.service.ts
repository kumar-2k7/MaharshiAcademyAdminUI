import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { environment } from 'src/environments/environment';
import { IDifficultyLevelList } from '@shared/models/levels.interface';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  difficultyLevels: IDifficultyLevelList[] = [];

  constructor(private http: HttpService) { }

  getAllDifficultyLevelsCall() {
    return this.http.postRequest(environment.apiUrl.GetDifficultyLevels, {});
  }

  saveDifficultyLevels(difficultyLevels: IDifficultyLevelList[]) {
    this.difficultyLevels = difficultyLevels;
  }

  getSaveDifficultyLevels(): IDifficultyLevelList[] {
    return this.difficultyLevels;
  }
}
