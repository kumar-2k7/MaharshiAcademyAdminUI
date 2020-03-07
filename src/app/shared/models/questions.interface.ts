export interface IQuestions {
    QuestionList: IQuestion[];
    StatusNumber: number;
    Status: string;
    StatusMessage: string;
}

export interface IQuestion {
    QuestionID: number;
    SubjectID: number;
    ChapterID: number;
    DifficultyLevelID: number;
    QuestionDescription: string;
    IsGroupQuestion: string;
    CaseStudyID: number;
    CreatedDate: string;
    CreatedBy: string;
    ModifiedDate: string;
    ModifiedBy: string;
    PurgeFlag: string;
    Answers: string;
}