export interface Subjects {
    SubjectList: SubjectsList[];
    StatusNumber: number;
    Status: string;
    StatusMessage: string;

}

export interface SubjectsList {
    SubjectID: number;
    SubjectName: string;
    CreatedDate: string;
    CreatedBy: string;
    ModifiedDate: string;
    ModifiedBy: string;
    PurgeFlag: string
}