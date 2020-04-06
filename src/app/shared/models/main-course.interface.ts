export interface RootObject {
    MainCourseList: MainCourseList[];
    StatusNumber: number;
    Status: string;
    StatusMessage: string;
  }
  
  export interface MainCourseList {
    CourseID: number;
    CourseName: string;
    CourseDescription: string;
    QuestionCount: number;
    CorrectAnswerWeightage: number;
    WrongAnswerWeightage: number;
    ExamTimeDuration: string;
    CreatedDate: string;
    CreatedBy: string;
    ModifiedDate: string;
    ModifiedBy: string;
    PurgeFlag: string;
  }