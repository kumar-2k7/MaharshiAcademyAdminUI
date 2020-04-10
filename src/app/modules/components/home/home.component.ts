import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subjects } from '@shared/models/subjects.interface';
import { SubjectsService } from '@modules/services/subjects.service';
import { LevelsService } from '@modules/services/levels.service';
import { ILevels } from '@shared/models/levels.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private subjects: SubjectsService, private level: LevelsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

    this.storeSubjects();
    this.storeLevel();
  }

  storeSubjects() {
    this.subjects.getAllSubjects().subscribe((res: Subjects) => {
      if (res.Status === 'SUCCESS') {
        this.subjects.storeSubjects(res.SubjectList);
      }
    });
  }

  storeLevel() {
    this.level.getAllDifficultyLevelsCall().subscribe((res: ILevels) => {
      if (res.Status === 'SUCCESS') {
        this.level.saveDifficultyLevels(res.DifficultyLevelList);
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
