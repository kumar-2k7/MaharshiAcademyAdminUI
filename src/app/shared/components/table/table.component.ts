import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Columns, RowOptions } from '@shared/models/table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() rows: any;
  @Input() columns: Columns[];
  @Input() actions?: string[] = [];
  @Output() onCellClick?: EventEmitter<RowOptions> = new EventEmitter<RowOptions>();
  @Output() actionPerformed?: EventEmitter<any> = new EventEmitter<any>();
  displayedColumns: string[];
  constructor() { }

  ngOnInit() {
    console.log(this.rows);
    console.log(this.actions);
    this.displayedColumns = this.columns.map(a => a.property);
    if (this.actions.length) {
      this.displayedColumns.push('Actions')
    }
    console.log(this.displayedColumns)
  }


  cellClicked(col, row) {
    this.onCellClick.emit({
      row: row,
      column: col,
      columns: this.columns
    })
  }

  action(action, row) {
    this.actionPerformed.emit({
      action: action,
      row: row
    })
  }
}
