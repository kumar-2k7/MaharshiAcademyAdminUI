import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyDialogComponent } from './case-study-dialog.component';

describe('CaseStudyDialogComponent', () => {
  let component: CaseStudyDialogComponent;
  let fixture: ComponentFixture<CaseStudyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseStudyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStudyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
