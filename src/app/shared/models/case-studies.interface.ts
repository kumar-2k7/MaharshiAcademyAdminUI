export interface ICaseStudies {
    CaseStudyList: ICaseStudy[];
    StatusNumber: number;
    Status: string;
    StatusMessage: string;
}

export interface ICaseStudy {
    CaseStudyID: number;
    SubjectID: number;
    ChapterID: number;
    DifficultyLevelID: number;
    CaseStudyDescription: string;
    CreatedDate: string;
    CreatedBy: string;
    ModifiedDate: string;
    ModifiedBy: string;
    PurgeFlag: string;
    Questions: string;
}