export const environment = {
  production: true,
  baseUrl: 'http://mrawebapi.maharshiacademy.com/api/',
  apiUrl: {
    GetAllSubjects: 'ManageMasterData/GetSubjectsAll',
    DeleteSubject: 'ManageMasterData/DeleteSubject',
    UpdateSubject: 'ManageMasterData/UpdateSubject',
    InsertSubject: 'ManageMasterData/InsertSubject',
    GetChaptersBySubjectID: 'ManageMasterData/GetChaptersBySubjectID',
    UpdateChapter: 'ManageMasterData/UpdateChapter',
    InsertChapter: 'ManageMasterData/InsertChapter',
    DeleteChapter: 'ManageMasterData/DeleteChapter'
  }
};
