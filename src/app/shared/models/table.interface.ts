export interface Columns {
    name: string;
    property: string;
}

export interface RowOptions {
    row: any;
    column: Columns;
    columns: Columns[];
}