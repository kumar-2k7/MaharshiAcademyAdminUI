export interface IExams {
    MainCourseList: MainCourseExamList[];
    StatusNumber: number;
    Status: string;
    StatusMessage: string;
  }
  
  export interface MainCourseExamList {
    ExamList: ExamList[];
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
  
  export interface ExamList {
    AutoID: number;
    CourseID: number;
    SubjectID: number;
    ChapterID: number;
    DifficultyLevelID: number;
    QuestionCount: number;
    IsGroupQuestion: boolean;
    CreatedDate: string;
    CreatedBy: string;
    ModifiedDate: string;
    ModifiedBy: string;
    PurgeFlag: string;
  }