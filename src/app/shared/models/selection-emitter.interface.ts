export interface ISelection {
    SelectionType: 'subject' | 'chapter' | 'question';
    SelectionValue: any;
    SelectionResponse?: any;
}