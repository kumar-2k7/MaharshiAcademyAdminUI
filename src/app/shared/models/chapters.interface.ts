export interface Chapters {
    ChapterList: ChaptersList[];
    StatusNumber: number;
    Status: string;
    StatusMessage: string;
}

export interface ChaptersList {
    ChapterID: number;
    SubjectID: number;
    SubjectName: string;
    ListOrder: number;
    ChapterName: string;
    CreatedDate: string;
    CreatedBy: string;
    ModifiedDate: string;
    ModifiedBy: string;
    PurgeFlag: string;
}