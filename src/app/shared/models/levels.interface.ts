export interface ILevels {
    DifficultyLevelList: IDifficultyLevelList[];
    StatusNumber: number;
    Status: string;
    StatusMessage: string;
}

export interface IDifficultyLevelList {
    DifficultyLevelID: number;
    DifficultyLevelDescription: string;
    ListOrder: number;
    CreatedDate: string;
    CreatedBy: string;
    ModifiedDate?: any;
    ModifiedBy?: any;
    PurgeFlag: string;
}