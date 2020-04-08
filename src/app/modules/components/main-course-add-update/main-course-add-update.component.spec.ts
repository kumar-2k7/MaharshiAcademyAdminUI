import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCourseAddUpdateComponent } from './main-course-add-update.component';

describe('MainCourseAddUpdateComponent', () => {
  let component: MainCourseAddUpdateComponent;
  let fixture: ComponentFixture<MainCourseAddUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCourseAddUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCourseAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
